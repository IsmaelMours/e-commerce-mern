// middleware/errorHandler.js
const winston = require('winston');
const path = require('path');
const { error } = require('console');

// Configure the Winston logger
const errorLogger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
    ),
    transports: [
        new winston.transports.File({ filename: path.join(__dirname, '../logs/error.log'), level: 'error' }),
        new winston.transports.Console({ level: 'error' }) // Also log to the console
    ]
});

// Middleware to handle errors
const errorHandler = (err, req, res, next) => {
    errorLogger.error(`Error: ${err.message}`);
    res.status(500).json({ message: 'Server Error', error: err.message });
    res.status(400).json({message: 'Bad request', error: err.message});
};

module.exports = errorHandler;
