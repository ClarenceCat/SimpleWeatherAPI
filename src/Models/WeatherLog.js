// file: WeatherLog.js
// description: This file contains the model which holds logged weather information
// Programmer: Daniel Grew
// Date Last Modified: 2021-05-16

const mongoose = require("mongoose");

// Schema to store weather information
const WeatherLogSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
        unique: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    weather: {
        type: Object,
        required: true
    }
});

// export model to use in mongoose
mongoose.model('WeatherLog', WeatherLogSchema);