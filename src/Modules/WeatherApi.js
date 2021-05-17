// file: WeatherAPI.js
// Description: This file is responsible for calling the weather API to retrieve up to date weather information about a city
// Programmer: Daniel Grew
// Date Last Modified: 2021-05-16

// require https to call the api
const axios = require('axios');
const logger = require('../Middleware/logger');

const { STATUS_NOT_FOUND } = require('../config/constants');

// function: getWeather
// description: This function calls the OpenWeather API to retrieve the current weather information for a given city
// parameters:
//      cityName : String - the name of the city to retrieve the weather for
// returns:
//      WeatherInfo : Object - this is null if the API returns an error or the city does not exist OR returns an object
//          containing the weather information for the specified city
//          
//          WeatherInfo : { "temp" : float, "feels_like" : float, "temp_min" : float, "temp_max" : float, "pressure" : Number, "humidity" : Number }
const getWeather = (cityName) => {

    return new Promise (async (resolve, reject) => {
        // create the api call string
        const api_call_str = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.WEATHER_API_KEY}`;
        // note - OpenWeather API returns status code 404 with message "city not found" when the city does not exist or cannot be found (error checking)
        // enter try catch block
        try{
            // log the call to open weather api
            logger.info(`Making GET request to the OpenWeather API (@openweathermap.org) with the city name ${cityName}`);
            // make get request to the openweather api
            const api_data = await axios.get(api_call_str);

            logger.info(`Open Weather API responded with a status code of ${api_data.status}`);
    
            // extract the data from the response object
            const weather_info = api_data.data.main;

    
            // there is an error accessing the info from the data retrieved from the api
            if(!weather_info) {
                logger.warn(`Unable to extract weather info from the OpenWeather api when requesting info for the city ${cityName}`);
                resolve(null);
            }
    
            resolve(weather_info);
        }
        catch(error)
        {
            // an error will be thrown if there is an axios error, or if the api responds with a status code outside of the 200-299 range
            // if this was a status code that is outside of the above specified range (2xx) - then this will be triggered
            if(error.response && error.response.status === STATUS_NOT_FOUND){
                logger.info(`Open Weather API responded with a status code of ${error.response.status} - ${ error.response.data }`);
                
                // return null
                resolve(null);
            }
            else{
                // if this code is called, then it is an issue with axios 
                logger.error(`Error making request to the Open Weather Api from this application - status: ${error.response.status} - message: ${error.response.data}`);
                reject(new Error(`Error making request to the Open Weather Api from this application - status: ${error.response.status} - message: ${error.response.data}`));
            }
        }
    })
}

module.exports = { getWeather };