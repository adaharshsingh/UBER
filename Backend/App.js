const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cookieParser= require('cookie-parser');
const cors = require('cors');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const capatinRoutes= require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes.js');
const RideRoutes = require('./routes/rides.routes.js');

const app = express();

// Connect to DB first
connectToDb();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use('/users', userRoutes);
app.use('/captains',capatinRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', RideRoutes);
module.exports = app;
