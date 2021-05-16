// file: weatherRoutes.js
// Description: This file contains the routes which handle requests to fetch the weather for a user's given city
// programmer: Daniel Grew
// Date Last Modified: 2021-05-14

const express = require('express');
const router = express.Router();

// @POST /api/weather
// @req - city : String
// @res - { weather details }
// Description: This route is responsible for handling the user request to retrieve the weather for a given city
router.post('/', (req, res) => {
    // retrieve the city from the body of the request
    const { city } = req.body;

    
})

module.exports = router;