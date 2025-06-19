const axios = require('axios');
const dotenv = require('dotenv');
const captainModel = require('../models/captain.model');
dotenv.config();

module.exports.getAddressCoordinates = async (address) => {
    const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API;

    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: address,
                key: GOOGLE_MAPS_API_KEY
            }
        });

        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error(`Geocoding error: ${response.data.status}`);
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        throw error;
    }
}
module.exports.getDistanceAndTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }
    const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API;
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
            params: {
                origins: origin,
                destinations: destination,
                key: GOOGLE_MAPS_API_KEY
            }
        });

        if (response.data.status === 'OK') {
            const element = response.data.rows[0].elements[0];
            return {
                distance: {
                    text: element.distance.text,
                    value: element.distance.value, // meters
                },
                duration: {
                    text: element.duration.text,
                    value: element.duration.value, // seconds
                },
            };
        } else {
            throw new Error(`Distance Matrix API error: ${response.data.status}`);
        }
    } catch (error) {
        console.error('Error fetching distance and time:', error.message);
        throw error;
    }
}
module.exports.getSuggestions = async (input) => {
    if (!input) {
        throw new Error('Input is required for suggestions');
    }
    const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API;
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
            params: {
                input: input,
                key: GOOGLE_MAPS_API_KEY
            }
        });

        if (response.data.status === 'OK') {
            return response.data.predictions.map(prediction => ({
                description: prediction.description,
                place_id: prediction.place_id
            }));
        } else {
            throw new Error(`Autocomplete API error: ${response.data.status}`);
        }
    } catch (error) {
        console.error('Error fetching suggestions:', error.message);
        throw error;
    }
}

module.exports.getCaptainsInRadius = async (lat, lng, radius) => {
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lat,lng], radius / 6378.1] // radius in kilometers
            }
        }
    });
    return captains;
}