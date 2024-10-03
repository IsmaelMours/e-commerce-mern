const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db.js');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Import auth routes
const categoryRoutes = require('./routes/categoryRoutes'); // Import category routes
const productRoutes = require('./routes/productRoutes'); // Import product routes
const requestLogger = require('./middlewares/logger'); // Import logger middleware
const errorHandler = require('./middlewares/errorHandler'); // Import error-handler middleware
const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Use logger middleware globally
app.use(requestLogger);

// Connect to the database
connectDB();

// Basic route
app.get('/', (req, res) => {
    res.send('E-commerce API is running...');
});

// Add error-handling middleware at the end
app.use(errorHandler);

// Use authentication routes
app.use('/api/auth', authRoutes);

// Use category routes
app.use('/api/categories', categoryRoutes);

// Use product routes
app.use('/api/products', productRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
