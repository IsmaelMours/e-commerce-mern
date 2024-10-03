// middleware/logger.js
const winston = require('winston');
const { format, transports } = winston;
const path = require('path');

// Configure the Winston logger
const logger = winston.createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
    ),
    transports: [
        new transports.File({
            filename: path.join(__dirname, '../logs/request.log'), // Log file path
            level: 'info'
        }),
        new transports.Console({ level: 'info' }) // Also log to the console
    ]
});

// Middleware to log incoming requests
const requestLogger = (req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next(); // Proceed to the next middleware or route handler
};

module.exports = requestLogger;
