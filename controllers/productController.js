const mongoose = require('mongoose');
const Category = require('../models/Category'); // Adjust the path if needed
const Product = require('../models/Product'); // Import Product model if not already done


// Add a new product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, countInStock, category } = req.body;

        // Check if the category ID is valid
        if (!mongoose.Types.ObjectId.isValid(category)) {
            return res.status(400).json({ message: 'Invalid category ID' });
        }

        // Check if the category exists
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Proceed to create the product if category is valid and exists
        const product = new Product({
            name,
            description,
            price,
            countInStock,
            category: categoryExists._id // Store the valid category ID
        });

        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');  // Populate category data
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    addProduct,
    getProducts,
};
