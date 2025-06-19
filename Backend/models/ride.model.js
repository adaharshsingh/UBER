
const mongoose = require('mongoose');
const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain',
    },
    pickupLocation: {
        type: String,
        required: true,
        minlength: 3
    },
    destination: {
        type: String,
        required: true,
        minlength: 3
    },
    rideStatus: {
        type: String,
        enum: ['pending', 'Accepted','on-the-way', 'completed', 'cancelled'],
        default: 'pending'
    },
    fare: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
    },
    distance: {
        type: Number,
    },
    paymentID:{
        type: String,
    },
    orderID: {
        type: String,
    },
    signature: {
        type: String,
    },
    otp: {
        required: true,
        type: String,
        select:false
    },
});

module.exports = mongoose.model('ride', rideSchema);