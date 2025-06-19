const express= require('express');
const router = express.Router();
const {body, query} = require('express-validator');
const rideController = require('../controller/ride.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/create-ride', 
    authMiddleware.authUser,
    body('pickupLocation').isString().isLength({ min: 3 }).withMessage('Pickup location must be at least 3 characters long'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Destination must be at least 3 characters long'),
    body('vehicleType').isString().isIn(['car', 'motorcycle', 'auto']).withMessage('Vehicle type must be one of: car, motorcycle, auto'),
    rideController.createRide
);

router.get('/get-fare', 
    authMiddleware.authUser,
    query('pickupLocation').isString().isLength({ min: 3 }).withMessage('Pickup location must be at least 3 characters long'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Destination must be at least 3 characters long'),
    rideController.getFare
);

router.post('/confirm-ride', 
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride ID'),
    rideController.confirmRide
);

router.get('/ride-started', 
    authMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride ID'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('OTP must be exactly 6 characters long'),
    rideController.startRide
);

router.post('/ride-completed',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.completeRide
);

module.exports = router;