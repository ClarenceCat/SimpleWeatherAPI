// file: server.js
// description: this file initializes the database used in the application, and starts the server.
// programmer: Daniel Grew
// Date Last Modified: 2021-05-14

// required modules
const express = require('express');

// get logger from logger
const logger = require('./Middleware/logger');
const logMiddleware = require('./Middleware/logMiddleware');

const app = express();

app.use(express.json());

// add logMiddleware as a middleware to the app
app.use(logMiddleware);

app.get('/', (req, res) => {
    res.send('recieved');
})

const port = process.env.PORT || 5000;

// start the server listening on the designated port
// export so that the server can be tested
module.exports = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    logger.info(`Server started on port ${port}`)
})