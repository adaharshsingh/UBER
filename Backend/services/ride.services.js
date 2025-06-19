const rideModel = require('../models/ride.model');
const { sendMessageToSocketId } = require('../socket');
const mapsService = require('./maps.service');
const crypto = require('crypto');



async function getFare(pickupLocation, destination) {
    if (!pickupLocation || !destination) {
        throw new Error('Pickup location and destination are required');
    }

    const DistanceTime = await mapsService.getDistanceAndTime(pickupLocation, destination);
    const distanceInKm = DistanceTime.distance.value / 1000;
    const durationInMinutes = DistanceTime.duration.value / 60;

    const baseFare = { car: 50, motorcycle: 20, auto: 30 };
    const perKmRate = { car: 10, motorcycle: 5, auto: 7 };
    const perMinuteRate = { car: 2, motorcycle: 1, auto: 1.5 };

    const round = n => Math.round(n * 100) / 100;

    const fare = {
        car: round(baseFare.car + distanceInKm * perKmRate.car + durationInMinutes * perMinuteRate.car),
        motorcycle: round(baseFare.motorcycle + distanceInKm * perKmRate.motorcycle + durationInMinutes * perMinuteRate.motorcycle),
        auto: round(baseFare.auto + distanceInKm * perKmRate.auto + durationInMinutes * perMinuteRate.auto)
    };
    return fare;
}
module.exports.getFare = getFare;

function getOtp(num) {
    const otp = crypto.randomInt(0, Math.pow(10, num)).toString().padStart(num, '0');
    return otp;
}
module.exports.createRide = async ({user,pickupLocation,destination,vehicleType})=>{
    if (!user || !pickupLocation || !destination || !vehicleType) {
        throw new Error('User, pickup location, destination, and vehicle type are required');
    }

    const fare = await getFare(pickupLocation, destination);

    const ride = new rideModel({
        user,
        pickupLocation,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType],
    });

    return await ride.save();

}

module.exports.confirmRide= async ({rideId,captain})=>{
    if (!rideId) {
        throw new Error('Ride ID is required');
    }

    await rideModel.findOneAndUpdate(
        { _id: rideId },
        {
            rideStatus: 'Accepted',
            captain: captain.id,
        }
        
    );

    const ride = await rideModel.findById(rideId).populate('user').populate('captain').select('+otp');

    return ride;
}

module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        rideStatus: 'on-the-way',
    })
    console.log("backend id of ride",rideId)

    return ride;
}

module.exports.completeRide = async ({ rideId,captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        rideStatus: 'completed'
    })
    return ride;
}