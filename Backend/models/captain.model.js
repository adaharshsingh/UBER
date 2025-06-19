const mongoose= require('mongoose');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/] // Regex for validating email format
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        plate: {
            type: String,
            minlength: [3, 'Plate must be at least 3 characters long'],
            required: true
        },
        capacity: {
            type: Number,
            min: [1, 'Capacity must be at least 1'],
            required: true
        },
        color: {
            type: String,
            minlength: [3, 'Color must be at least 3 characters long'],
            required: true
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'auto', 'motorcycle'],
        }
    },
        location: 
        {
            ltd: {
                type: Number
            },
            lng: {
                type: Number
            }
        }
    
});

captainSchema.methods.generateAuthToken=function()
{
            const token = jwt.sign({ id: this._id }, process.env.SECRET_KEY, {expiresIn:'24h'});
                return token;
        }
        captainSchema.methods.comparePassword= async function(password){
            return await bcrypt.compare(password,this.password);
        }
        
        captainSchema.statics.hashPassword=async function (password) {
            return await bcrypt.hash(password,10);
            
}

        const captainModel= mongoose.model('captain', captainSchema)
        module.exports= captainModel;