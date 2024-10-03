// routes/categoryRoutes.js
const express = require('express');
const { addCategory, getCategories, deleteCategoryWithProducts } = require('../controllers/categoryController');
const router = express.Router();

// Route to add a new category
router.post('/add', addCategory);

// Route to get all categories
router.get('/', getCategories);

router.delete('/:categoryID', deleteCategoryWithProducts)

module.exports = router;
