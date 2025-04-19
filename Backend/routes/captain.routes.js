const captainController = require('../controller/captain.controller');
const express= require('express');
const router= express.Router();
const {body}= require('express-validator');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('fullName.firstName').isLength({ min: 3 }).withMessage('It should be of length more than 3'),
    body('password').isLength({ min: 6 }).withMessage('It should be greater than 6'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('It should be of length more than 3'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('It should be of length more than 3'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Vehicle capacity must be at least 1'),
    body('vehicle.type').isIn(['car','motorcycle','auto']).withMessage('Invalid vehicle')
], captainController.registerCaptain
)

module.exports=router;