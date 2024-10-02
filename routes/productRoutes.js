const express = require('express');
const { addProduct, getProducts } = require('../controllers/productController');
const router = express.Router();

// Route to add a product (with categoryId as a URL parameter)
router.post('/add/:categoryId', addProduct);

// Route to get all products
router.get('/', getProducts);

module.exports = router;
