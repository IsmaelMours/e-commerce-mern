const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({

    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Reference the Category
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
