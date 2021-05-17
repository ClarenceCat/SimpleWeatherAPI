// file: WeatherInfo.js
// Description: This file is responsible for handling weather info in the database 
// Programmer: Daniel Grew
// Date Last Modified: 2021-05-16

// requirements for file
const mongoose = require('mongoose');
const logger = require('../Middleware/logger');

// require the WeatherLog model
const WeatherLog = mongoose.model('WeatherLog');

const { WEATHER_REFRESH_TIME } = require('../config/constants');

// function: checkWeatherLogs
// description: Checks if there are any weather logs in the database that are from the past 20 seconds
// params: cityName : String
// returns: an object containing the weather info for the specified city IF the city is found in the WeatherLog document in the database and the timestamp is less than 20 
//      seconds from the current timestamp. Otherwise Null
const checkWeatherLogs = async (cityName) => {
    
    logger.info(`Searching database for a city with the name ${cityName}`);

    // attempt to find a record with that city name in the database
    const found = await WeatherLog.findOne({city: cityName});

    // if the log is not found then return null
    if(!found)
    {
        return null;
    }

    // check the timestamp
    const cur_time = new Date();
    let time_dif = cur_time - found.timestamp;

    // check if the time difference is greater than the specified maximum time difference before refresh
    if(time_dif > WEATHER_REFRESH_TIME){
        // delete the record from the database
        logger.info(`Removing the city ${cityName} from database`);
    }
}
