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
const checkWeatherLogs = (cityName) => {
    return new Promise(async (resolve, reject) => {
        logger.info(`Searching database for a city with the name ${cityName}`);
    
        // attempt to find a record with that city name in the database
        const found = await WeatherLog.findOne({city: cityName});
    
        // if the log is not found then return null
        if(!found)
        {
            resolve (null);
        }
    
        // check the timestamp
        const cur_time = new Date();
        let time_dif = cur_time - found.timestamp;
    
        // check if the time difference is greater than the specified maximum time difference before refresh
        if(time_dif > WEATHER_REFRESH_TIME){
            // delete the record from the database
            logger.info(`Removing the city ${cityName} from database`);
            try{
                await WeatherLog.findByIdAndDelete(found._id);
                logger.info(`Successfully removed city with the name ${found.city} from the WeatherLog Database`);
    
                resolve(null);
            }
            catch(e){
                // if there is an error - log the error and throw an error
                logger.error(`There was an error removing the city with the name ${found.city} from the WeatherLog Database`)
                reject( new Error("Failed to remove the city from the database"));
            }
        }
            // if this point is reached, then the info does not need to be updated and we can return the info in the database to the user
            resolve (found.weather);
    })
}


// function: insertNewLog
// description: Inserts new weather data for a city into the database
// params: cityName : String, weatherInfo : Object : { "temp" : float, "feels_like" : float, "temp_min" : float, "temp_max" : float, "pressure" : Number, "humidity" : Number }
// returns: the weather info if it is successful or a null if it is not successfull 
const insertNewLog = (cityName, weatherInfo) => {
    return new Promise(async (resolve, reject) => {
        try{
            // create a new model object to save to the database
            const newLog = new WeatherLog({ city: cityName, weather: weatherInfo });
    
            logger.info(`Saving weather info for the city ${cityName} : weather info is ${weatherInfo}`);
    
            // save the weather info to the database
            const createdLog = await newLog.save();
    
            // log the fact that the log was successfully created
            logger.info(`Successfully inserted weather info for the city ${cityName}`);
            resolve(createdLog.weather);
        }
        catch(e){
            logger.error(`Failed to insert weather information for the city ${cityName} in the database`);
            reject(new Error(`Failed to insert weather information for the city ${cityName} in the database`));
        }
    })
}

// export the functions
module.exports = {
    checkWeatherLogs,
    insertNewLog
}