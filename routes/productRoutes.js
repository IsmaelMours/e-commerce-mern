const express = require('express');
const { addProduct, getProducts, getProductsByCategory } = require('../controllers/productController');
const router = express.Router();

// Route to add a product (with categoryId as a URL parameter)
router.post('/add/:categoryId', addProduct);

// New route to get products by category
router.get('/category/:categoryId', getProductsByCategory);

// Route to get all products
router.get('/', getProducts);

module.exports = router;
