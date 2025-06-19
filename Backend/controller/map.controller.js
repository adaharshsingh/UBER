const mapsService = require('../services/maps.service');
const { validationResult } = require('express-validator');


module.exports.getCoordinates = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { address } = req.query;

    if (!address) {
        return res.status(400).json({ error: 'Address query parameter is required' });
    }

    try {
        const coordinates = await mapsService.getAddressCoordinates(address);
        return res.status(200).json(coordinates);
    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        return res.status(404).json({ error: 'Failed to fetch coordinates' });
    }
}

module.exports.getDistanceAndTime = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { origin, destination } = req.query;

    if (!origin || !destination) {
        return res.status(400).json({ error: 'Origin and destination query parameters are required' });
    }

    try {
        const distanceAndTime = await mapsService.getDistanceAndTime(origin, destination);
        return res.status(200).json(distanceAndTime);
    } catch (error) {
        console.error('Error fetching distance and time:', error.message);
        return res.status(404).json({ error: 'Failed to fetch distance and time' });
    }
}

module.exports.getSuggestions = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { input } = req.query;

        if (!input) {
            return res.status(400).json({ error: 'Input query parameter is required' });
        }

        const suggestions = await mapsService.getSuggestions(input);
        return res.status(200).json(suggestions);
    } catch (error) {
        console.error('Error fetching suggestions:', error.message);
        return res.status(404).json({ error: 'Failed to fetch suggestions' });
    }
}