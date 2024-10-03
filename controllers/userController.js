const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/User'); // Assuming you have a User model

// Function to generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token expires in 30 days
    });
};

// ------------------ REGISTER USER ------------------ //
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    // If user creation is successful, return user data and token
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id), // Generate JWT token
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
});

// ------------------ LOGIN USER ------------------ //
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Log user and password details for debugging
    console.log('User:', user);
    console.log('Provided password:', password);

    // Check if user exists and the provided password matches the stored password
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id), // Generate JWT token
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});

module.exports = { registerUser, loginUser };
