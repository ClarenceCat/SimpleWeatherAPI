// file: logger.js
// description: This file contains the definition of the logger used throughout the application
// programmer: Daniel Grew
// Date Last Modified: 2021-05-14

const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: `./logs/${new Date().toISOString().slice(0,10)}.log` }),
    ],
});

module.exports = logger;