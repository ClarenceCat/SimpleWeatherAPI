// file: weatherAPI.js
// descriptionL This file contains the tests used to test the Weather API
// Programmer: Daniel Grew
// Date Last Modified: 2021-05-16

// required dependancies for the test module
const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../src/server');

const mongoose = require('mongoose');
const response = require('express');

const WeatherLog = mongoose.model('WeatherLog');

// require the functions used in the routes 
const { getWeather } = require('../src/Modules/WeatherApi');
const { checkWeatherLogs, insertNewLog } = require('../src/Modules/WeatherInfo');
const { expect } = require('chai');

// configure chai
// we are using should declarations 
chai.should();

// this allows us to make requests to the server
chai.use(chaiHttp);

// testing the functions in the WeatherApi module
describe("WeatherApi functions", () => {
    // TEST 1
    // Function: getWeather
    // Description: This test will test the happy route for the getWeather Function
    // Expected Return: weather info
    describe('TEST 1 - Happy path test for getWeather()', async () => {

        const test_city = 'toronto';

        it('Should call the Open Weather API to retrieve the current weather for Toronto', (done) => {
            // call function passing in the string 'toronto
            const res = await getWeather(test_city);

            // should be an object
            expect(res).to.be.an('object');
            expect(res).to.have.property('temp');
            expect(res).to.have.property('feels_like');
            expect(res).to.have.property('temp_min');
            expect(res).to.have.property('temp_max');
            expect(res).to.have.property('pressure');
            expect(res).to.have.property('humidity');

            done();
        })
    });

    // TEST 2
    // Function: getWeather
    // Description: This tests when the city does not exist
    // Expected Return: null
    // Boundary Case
    describe('TEST 2 - Testing a city that does not exist', () => {
        const fake_city = 'does_not_exist';

        it('Should call the Open Weather API to retrieve the current weather for Toronto', (done) => {
            // call function passing in the string 'toronto
            const res = await getWeather(test_city);

            // should be an object
            expect(res).to.equal(null);

            done();
        });
    });
});


// testing functions in the WeatherInfo module
describe("WeatherInfo functions", () => {

    let pass_1 = null;
    let fail_1 = null;
    let failing_info_2_city = 'paris';

    // this will run before each test 
    beforeEach((async () => {
        // set up test data to use in testing the functions
        const passing_info_1 = new WeatherLog({ city: 'toronto', timestamp: new Date(), weather: {temp: 21, feels_like: 22, temp_min: 18, temp_max: 25, pressure: 200, humidity: 100} });
        const failing_info_1 = new WeatherLog({ city: 'london', timestamp: ((new Date()) - 40000), weather: {temp: 21, feels_like: 22, temp_min: 18, temp_max: 25, pressure: 200, humidity: 100} })

        try{
            // save the test data
            pass_1 = await passing_info_1.save();
            fail_1 = await failing_info_1.save();

            test_database_logs = [pass_1, pass_2];
        }
        catch(e)
        {
            console.log(e);
            return;
        }
    }));

    // this is run after each test
    afterEach((async () => {
        // remove the database info
        try{
            await WeatherLog.findByIdAndDelete(pass_1._id);
            await WeatherLog.findByIdAndDelete(fail_1._id);
        }
        catch(error)
        {
            console.log(error);
            return;
        }
    }))

    // TEST 1
    // Function: checkWeatherLogs
    // Description: Tests the checkWeatherLogs function for a city that has been stored less than 20 seconds ago
    // Expected Return: weather info
    describe('TEST 1 - Happy path test for checkWeatherLogs() - with weather that has been stored <20 seconds ago', async () => {

        const test_city = 'toronto';

        it('Should call the Open Weather API to retrieve the current weather for Toronto', (done) => {
            // call function passing in the string 'toronto
            const res = await getWeather(test_city);

            // should be an object
            expect(res).to.be.an('object');
            expect(res).to.have.property('temp');
            expect(res).to.have.property('feels_like');
            expect(res).to.have.property('temp_min');
            expect(res).to.have.property('temp_max');
            expect(res).to.have.property('pressure');
            expect(res).to.have.property('humidity');

            done();
        })
    });

    // TEST 2
    // Function: checkWeatherLogs
    // Description: Tests the checkWeatherLogs function for a city that has been stored more than 20 seconds ago
    // Expected Return: null
    describe('TEST 2 - Happy path test for checkWeatherLogs() - with weather that has been stored >20 seconds ago', async () => {

        const test_city = 'london';

        it('Should call the Open Weather API to retrieve the current weather for Toronto', (done) => {
            // call function passing in the string 'toronto
            const res = await getWeather(test_city);

            // should return null
            expect(res).to.equal(null);

            done();
        })
    });

    // TEST 3
    // Function: checkWeatherLogs
    // Description: Runs the function with a city that is not in the database
    // Expected Return: null
    describe('TEST 3 - Happy path test for checkWeatherLogs() - with weather from a city that is not stored in database', async () => {

        const test_city = failing_info_2_city;

        it('Should call the Open Weather API to retrieve the current weather for Toronto', (done) => {
            // call function passing in the string 'toronto
            const res = await getWeather(test_city);

            // should return null
            expect(res).to.equal(null);

            done();
        })
    });

    describe('TEST 4 - Happy Path test for insertNewLog() - this inserts weather info into the database', () => {
        // set up data to test
        const insert_city = 'amsterdam';
        const weather = {temp: 21, feels_like: 22, temp_min: 18, temp_max: 25, pressure: 200, humidity: 100};

        it('Should insert a new record and return a weather object with the weather of the city inserted into the database', (done) => {
            // call function passing in the string 'toronto
            const res = await insertNewLog(insert_city, weather);

            // should return the weather that has been passed into the function
            expect(res).to.equal(weather);

            done();
        })
    });
});

// testing the API route for retrieving weather data
describe('Weather API calls', () => {
    
})


