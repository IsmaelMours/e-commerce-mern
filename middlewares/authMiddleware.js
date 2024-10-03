const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model
const asyncHandler = require('express-async-handler');

// Protect routes middleware
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check if the token is sent in the Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token and attach to the request object (excluding password)
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    // If no token, return unauthorized error
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
});

module.exports = { protect };
