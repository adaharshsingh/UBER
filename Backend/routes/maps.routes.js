const express = require('express');
const router = express.Router();
const mapController = require('../controller/map.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { query } = require('express-validator');

router.get('/get-Coordinates',
  query('address').isString().isLength({ min: 3 }),
  authMiddleware.authUser,
  mapController.getCoordinates
);
router.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getDistanceAndTime
    );
    router.get('/get-suggestions',
    query('input').isString().isLength({ min: 3 }), 
    authMiddleware.authUser,
    mapController.getSuggestions
    );
module.exports = router;
