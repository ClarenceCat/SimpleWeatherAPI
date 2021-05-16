// file: logMiddleware.js
// description: This file specifies the middleware used to log the request details
// programmer: Daniel Grew
// Date Last Modified: 2021-05-14

const logger = require('./logger');

// middleware 
// description: logs info about the request 
const logMiddleware = (req, res, next) => {
    // log info about requester 
    logger.info(`host: ${req.hostname} method: ${req.method} url: ${req.path} from ip: ${req.ip}`);

    next();
}

module.exports = logMiddleware;