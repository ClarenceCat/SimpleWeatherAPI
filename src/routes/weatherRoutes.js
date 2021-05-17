// file: weatherRoutes.js
// Description: This file contains the routes which handle requests to fetch the weather for a user's given city
// programmer: Daniel Grew
// Date Last Modified: 2021-05-14

const express = require('express');
const router = express.Router();

const logger = require('../Middleware/logger');

// require the functions used in the routes 
const { getWeather } = require('../Modules/WeatherApi');
const { checkWeatherLogs, insertNewLog } = require('../Modules/WeatherInfo');

// @POST /api/weather
// @req - city : String
// @res - { weather details }
// Description: This route is responsible for handling the user request to retrieve the weather for a given city
router.post('/', (req, res) => {
    // retrieve the city from the body of the request
    const { city } = req.body;

    // make sure the body contains the city name 
    if(!city){
        res.status(401).send({error: "You have not specified the city that you would like to get the weather for"});
        logger.info(`responded to ${res.ip} with status code 401. The user did not specify the city name`);
    }

    // log the user request
    logger.info(`Request from ${req.ip} requested city ${city}`);

    // check the database for the city

    // if the city is not in the database call api to retrieve the weather for the city

    // AND insert the new info into the database

})

module.exports = router;