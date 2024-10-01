const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db.js');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Import auth routes
const PORT = process.env.PORT || 5000;
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Connect to the database
connectDB();

// Basic route
app.get('/', (req, res) => {
    res.send('E-commerce API is running...');
});

// Use authentication routes
app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
