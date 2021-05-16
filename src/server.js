// file: server.js
// description: this file initializes the database used in the application, and starts the server.
// programmer: Daniel Grew
// Date Last Modified: 2021-05-14

// required modules
const express = require('express');
const mongoose = require('mongoose');

// get logger and loggerMiddleware
const logger = require('./Middleware/logger');
const logMiddleware = require('./Middleware/logMiddleware');

const app = express();

app.use(express.json());

// add logMiddleware as a middleware to the app - logs info about incoming messages
app.use(logMiddleware);

// Connect to db 
const mongoUri = process.env.DB_URI;
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
});
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});
mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo'. err);
})

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