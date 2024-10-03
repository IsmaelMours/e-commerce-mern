const express = require('express');
const router = express.Router();
const { addToCart } = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware'); // Assuming you have an auth middleware

// POST: Add a product to the cart
router.post('/add/:id', protect, addToCart);

module.exports = router;
