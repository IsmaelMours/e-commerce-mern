const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add a product to the cart
const addToCart = async (req, res) => {
    const userId = req.user._id; // Assuming you have authentication to get user id
    const productId = req.params.id;
    const quantity = req.body.quantity || 1;

    try {
        // Find the cart for the user
        let cart = await Cart.findOne({ user: userId });

        // Find the product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // If cart doesn't exist, create a new cart
        if (!cart) {
            cart = new Cart({ user: userId, products: [], totalPrice: 0 });
        }

        // Check if product already exists in cart
        const productIndex = cart.products.findIndex(p => p.product.equals(productId));

        if (productIndex > -1) {
            // If product exists in cart, update the quantity
            cart.products[productIndex].quantity += quantity;
        } else {
            // If product doesn't exist, add it to the cart
            cart.products.push({ product: productId, quantity });
        }

        // Calculate the total price of the cart
        const totalPrice = cart.products.reduce((total, p) => {
            return total + (p.quantity * product.price);
        }, 0);

        cart.totalPrice = totalPrice;

        // Save the cart
        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { addToCart };
