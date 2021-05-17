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

const { STATUS_SERVER_ERROR, STATUS_SUCCESS, STATUS_CLIENT_ERROR } = require('../config/constants')

// @POST /api/weather
// @req - city : String
// @res - { city, weather }
// Description: This route is responsible for handling the user request to retrieve the weather for a given city
router.post('/', async (req, res) => {
    // retrieve the city from the body of the request
    const { city } = req.body;

    // make sure the body contains the city name 
    if(!city){
        res.status(STATUS_ACCESS_DENIED).send({error: "You have not specified the city that you would like to get the weather for"});
        logger.info(`responded to ${res.ip} with status code 401. The user did not specify the city name`);
    }

    // log the user request
    logger.info(`Request from ${req.ip} requested city ${city}`);

    try{
        // check the database for the city
        const foundDBWeather = await checkWeatherLogs(city);

        // check if the record was found in the database
        if(foundDBWeather){
            // respond with the weather info for the city
            const weather_info = {city: city, weather: foundDBWeather}
            res.status(STATUS_SUCCESS).send(weather_info);
            logger.info(`Responded to ${req.ip} with a status of 200. Containing the info ${weather_info}`);
        }

        // if the city is not in the database call api to retrieve the weather for the city
        const retrieveWeather = await getWeather(city);

        // check if the info was successfully retrieved
        if(!retrieve_weather){
            return res.status(STATUS_CLIENT_ERROR).send({error: "Could not find city"})
        }

        // AND insert the new info into the database
        insertNewLog(city, retrieveWeather);

        // respond with weather info
        return res.status(STATUS_SUCCESS).send({city: city, weather: retrieveWeather});
    }
    catch(error)
    {
        // log the error
        logger.error(error);

        // respond to the user
        return res.status(STATUS_SERVER_ERROR).send({error: "There was an error retrieving weather data"});
    }
})

module.exports = router;