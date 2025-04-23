// route/chatRoutes.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/auth');
const asyncHandler = require('express-async-handler');

// Get all messages for a product
router.get('/product/:productId', authMiddleware, asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id; // From JWT via authMiddleware

  // Verify the product exists
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Check if the user is the owner (seller) or a potential buyer
  const isSeller = product.owner.toString() === userId.toString();
  if (!isSeller) {
    // For now, allow any authenticated user to chat (buyer role not explicit in User model)
    // You could add logic here if you track buyers differently
  }

  // Fetch messages where the user is either sender or receiver
  const messages = await Message.find({
    productId,
    $or: [
      { senderId: userId },
      { receiverId: userId },
    ],
  })
    .populate('senderId', 'walletAddress email') // Adjust fields as needed
    .populate('receiverId', 'walletAddress email')
    .sort({ timestamp: 1 }); // Oldest first

  res.json(messages);
}));

// Send a new message
router.post('/send', authMiddleware, asyncHandler(async (req, res) => {
  const { productId, message } = req.body;
  const senderId = req.user._id; // From JWT

  // Validate input
  if (!productId || !message) {
    res.status(400);
    throw new Error('Product ID and message are required');
  }

  // Verify product exists
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Receiver is the product owner (seller) if sender isn’t the owner
  const receiverId = product.owner.toString() === senderId.toString() ? null : product.owner;
  if (!receiverId) {
    res.status(400);
    throw new Error('Cannot send message to yourself'); // Adjust if buyers can reply
  }

  const newMessage = new Message({
    productId,
    senderId,
    receiverId,
    message,
  });

  await newMessage.save();
  const populatedMessage = await Message.findById(newMessage._id)
    .populate('senderId', 'walletAddress email')
    .populate('receiverId', 'walletAddress email');

  res.status(201).json({ message: 'Message sent', data: populatedMessage });
}));


module.exports = router;