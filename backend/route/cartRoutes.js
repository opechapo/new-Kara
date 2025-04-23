const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Notification = require('../models/Notification');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/auth');
const asyncHandler = require('express-async-handler');

// Clean up invalid cart items efficiently
const cleanCartItems = async (cart, userId) => {
  if (!cart.items.length) return cart;

  // Fetch all product IDs in one query
  const productIds = cart.items.map(item => item.product);
  const validProducts = await Product.find({ _id: { $in: productIds } }).select('_id name');
  const validProductIds = new Set(validProducts.map(p => p._id.toString()));

  // Track removed items for notification
  const removedItems = [];
  const validItems = cart.items.filter(item => {
    const isValid = validProductIds.has(item.product.toString());
    if (!isValid) {
      removedItems.push(item);
    }
    return isValid;
  });

  if (removedItems.length) {
    cart.items = validItems;
    await cart.save();

    // Create notification for removed items
    const itemDetails = removedItems
      .map(item => `${item.quantity} x "Unknown Product"`) // Name unavailable since product is gone
      .join(', ');
    await new Notification({
      user: userId,
      message: `Removed ${removedItems.length} unavailable item(s) from your cart: ${itemDetails}`,
    }).save();
  }

  return cart;
};

// Get user's cart
router.get('/', authMiddleware, asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = new Cart({ user: req.user._id, items: [] });
    await cart.save();
  }

  // Clean up invalid items
  cart = await cleanCartItems(cart, req.user._id);

  // Populate after cleanup
  await cart.populate({
    path: 'items.product',
    populate: { path: 'owner', select: 'walletAddress' },
  });

  res.json({ success: true, data: cart });
}));

// Add item to cart
router.post('/add', authMiddleware, asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId || !quantity || !Number.isInteger(quantity) || quantity < 1) {
    return res.status(400).json({
      success: false,
      message: 'Valid Product ID and integer quantity (minimum 1) are required',
    });
  }

  // Verify product exists
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = new Cart({ user: req.user._id, items: [] });
  }

  const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);
  if (existingItemIndex > -1) {
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  await cart.populate({
    path: 'items.product',
    populate: { path: 'owner', select: 'walletAddress' },
  });

  // Create a notification
  await new Notification({
    user: req.user._id,
    message: `Added ${quantity} x "${product.name}" to your cart`,
  }).save();

  res.status(201).json({ success: true, data: cart });
}));

// Remove item from cart
router.delete('/remove/:itemId', authMiddleware, asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  let cart = await Cart.findOne({ user: req.user._id }).populate({
    path: 'items.product',
    populate: { path: 'owner', select: 'walletAddress' },
  });
  if (!cart) {
    return res.status(404).json({ success: false, message: 'Cart not found' });
  }

  const itemToRemove = cart.items.find(item => item._id.toString() === itemId);
  if (!itemToRemove) {
    return res.status(404).json({ success: false, message: 'Item not found in cart' });
  }

  cart.items = cart.items.filter(item => item._id.toString() !== itemId);
  await cart.save();
  await cart.populate({
    path: 'items.product',
    populate: { path: 'owner', select: 'walletAddress' },
  });

  // Create a notification
  if (itemToRemove.product) {
    await new Notification({
      user: req.user._id,
      message: `Removed ${itemToRemove.quantity} x "${itemToRemove.product.name}" from your cart`,
    }).save();
  }

  res.json({ success: true, data: cart });
}));

// Clear user's cart (for checkout)
router.delete('/clear', authMiddleware, asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id }).populate({
    path: 'items.product',
    populate: { path: 'owner', select: 'walletAddress' },
  });
  if (!cart) {
    return res.status(404).json({ success: false, message: 'Cart not found' });
  }

  if (cart.items.length === 0) {
    return res.status(200).json({ success: true, message: 'Cart already empty', data: cart });
  }

  // Create a notification
  const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);
  const itemDetails = cart.items
    .filter(item => item.product)
    .map(item => `${item.quantity} x "${item.product.name}"`)
    .join(', ');
  if (itemDetails) {
    await new Notification({
      user: req.user._id,
      message: `Checked out and cleared ${itemCount} item(s) from your cart: ${itemDetails}`,
    }).save();
  }

  cart.items = [];
  await cart.save();
  res.json({ success: true, message: 'Cart cleared', data: cart });
}));

// Cleanup route for user-specific stale cart items
router.delete('/cleanup', authMiddleware, asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return res.status(404).json({ success: false, message: 'Cart not found' });
  }
  cart = await cleanCartItems(cart, req.user._id);
  await cart.populate({
    path: 'items.product',
    populate: { path: 'owner', select: 'walletAddress' },
  });
  res.json({ success: true, message: 'Cart cleaned', data: cart });
}));

// Admin route for system-wide cart cleanup (optional, requires admin middleware)
router.delete('/cleanup-all', authMiddleware, asyncHandler(async (req, res) => {
  // Add admin check if needed: if (!req.user.isAdmin) return res.status(403).json(...)
  const carts = await Cart.find();
  let totalRemoved = 0;
  for (const cart of carts) {
    const originalLength = cart.items.length;
    await cleanCartItems(cart, cart.user);
    totalRemoved += originalLength - cart.items.length;
  }
  res.json({
    success: true,
    message: `System-wide cleanup complete. Removed ${totalRemoved} invalid item(s) across all carts.`,
  });
}));

module.exports = router;