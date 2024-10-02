const Category = require('../models/Category')

// @desc    Add a new category
// @route   POST /api/categories/add
// @access  Public

const addCategory = async(req, res)=>{
    const {name, description } = req.body;
    try {
        const categoryExists = await Category.findOne({ name });
        
        if(categoryExists){
            return res.status(400).json({message: 'category already exists'});
        }

        const category = new Category({
            name,
            description,
        })

        const createdCategory = await category.save();
        res.status(201).json(createdCategory)

    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }

};

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public

const getCategories = async (req, res) => {
    try{
        const categories = await Category.find({});
        res.json(categories);
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    addCategory,
    getCategories
};