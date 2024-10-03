const mongoose = require('mongoose');
const Category = require('../models/Category'); // Adjust the path if needed
const Product = require('../models/Product'); // Import Product model if not already done


// Add a new product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, countInStock } = req.body;
        const { categoryId } = req.params; // Get categoryId from URL params

        // Check if the category ID is valid
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ message: 'Invalid category ID' });
        }

        // Check if the category exists
        const categoryExists = await Category.findById(categoryId);
        if (!categoryExists) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Create a new product
        const product = new Product({
            name,
            description,
            price,
            countInStock,
            category: categoryId // Set category as the ObjectId
        });

        // Save the product to the database
        const savedProduct = await product.save();

        // Respond with the saved product
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Products by Category Controller
const getProductsByCategory = async(req, res)=>{
    try {
        const{categoryId} = req.params;

        // check if the category ID is valid
        if(!mongoose.Types.ObjectId.isValid(categoryId)){
            return res.status(400).json({message: 'Invalid category ID'})
        }
        // check if the category exists
        const categoryExists = await Category.findById(categoryId)
        if (!categoryExists) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Find all products associated with this category
        const products = await Product.find({ category: categoryId });

        // Return the products in the response
        res.status(200).json(products);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
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
    getProductsByCategory
};
