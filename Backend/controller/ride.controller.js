const rideService = require('../services/ride.services');
const {validationResult} = require('express-validator');
const mapService = require('../services/maps.service');
const {sendMessageToSocketId} = require('../socket');
const rideModel = require('../models/ride.model');


module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { user, pickupLocation, destination, vehicleType } = req.body;
    try {
        const ride = await rideService.createRide({ user :req.user._id, pickupLocation, destination, vehicleType });
        const pickUpCoordintes=await mapService.getAddressCoordinates(pickupLocation);
        const CaptainsInRadius=await mapService.getCaptainsInRadius(pickUpCoordintes.lat, pickUpCoordintes.lng, 6000);
        ride.otp=""

        const rideWithuser= await rideModel.findOne({ _id: ride._id }).populate('user');

        CaptainsInRadius.map(async (captain) => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithuser
            })
        })
        console.log('Captains in radius:', CaptainsInRadius);
        console.log('Ride created:', ride);
        res.status(201).json({ message: 'Ride created successfully', ride });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickupLocation, destination } = req.query;
    try {
        const fare = await rideService.getFare(pickupLocation, destination);
        return res.status(200).json({ fare });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.confirmRide({ rideId, captain: req.captain });
        console.log("hiubijbhjkbkjbk", ride.user.socketId,"safsdmfkmskfmasa");

        sendMessageToSocketId(ride.user.socketId, {
            event : 'ride-confirm',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {

        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}


module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })
        return res.status(200).json(ride);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

module.exports.completeRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.completeRide({ rideId, captain: req.captain });
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-completed',
            data: ride
        })
        return res.status(200).json(ride);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}