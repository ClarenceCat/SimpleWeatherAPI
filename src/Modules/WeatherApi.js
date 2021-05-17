// file: WeatherAPI.js
// Description: This file is responsible for calling the weather API to retrieve up to date weather information about a city
// Programmer: Daniel Grew
// Date Last Modified: 2021-05-16

// require https to call the api
const https = require('https');

// function: getWeather
// description: This function calls the OpenWeather API to retrieve the current weather information for a given city
// parameters:
//      cityName : String - the name of the city to retrieve the weather for
// returns:
//      WeatherInfo : Object - this is null if the API returns an error or the city does not exist OR returns an object
//          containing the weather information for the specified city
//          
//          WeatherInfo : { "temp" : float, "feels_like" : float, "temp_min" : float, "temp_max" : float, "pressure" : Number, "humidity" : Number }
const getWeather = async (cityName) => {
    // create the api call string
    const api_call = `api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.WEATHER_API_KEY}`;

    // note - OpenWeather API returns status code 404 with message "city not found" when the city does not exist or cannot be found (error checking)
    // enter try catch block

}
