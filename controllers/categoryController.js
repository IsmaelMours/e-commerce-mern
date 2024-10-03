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

// Delete Category with Its Products
const deleteCategoryWithProducts = async (req, res) => {
    try {
        const { categoryId } = req.params;

        // Check if the category ID is valid
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ message: 'Invalid category ID' });
        }

        // Check if the category exists
        const categoryExists = await Category.findById(categoryId);
        if (!categoryExists) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Delete all products associated with this category
        await Product.deleteMany({ category: categoryId });

        // Delete the category
        await Category.findByIdAndDelete(categoryId);

        res.status(200).json({ message: 'Category and its products deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
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
    getCategories,
    deleteCategoryWithProducts
};