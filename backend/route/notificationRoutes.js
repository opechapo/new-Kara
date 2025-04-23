const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const authMiddleware = require('../middleware/auth');
const asyncHandler = require('express-async-handler');

// Get unread notification count for the authenticated user
router.get('/count', authMiddleware, asyncHandler(async (req, res) => {
  const count = await Notification.countDocuments({ user: req.user._id, read: false });
  res.json({ success: true, data: { count } });
}));

// Get all notifications for the authenticated user
router.get('/', authMiddleware, asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id })
    .populate('user', 'walletAddress')
    .sort({ createdAt: -1 })
    .lean();
  res.json({ success: true, data: notifications });
}));

// Get all notifications across all users (admin only)
router.get('/all', authMiddleware, asyncHandler(async (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  const notifications = await Notification.find()
    .populate('user', 'walletAddress')
    .sort({ createdAt: -1 })
    .lean();
  res.json({ success: true, data: notifications });
}));

// Mark a notification as read
router.patch('/:id/read', authMiddleware, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { read } = req.body;
  const notification = await Notification.findOne({ _id: id, user: req.user._id });
  if (!notification) {
    return res.status(404).json({ success: false, message: 'Notification not found or not owned by user' });
  }
  notification.read = read;
  await notification.save();
  res.json({ success: true, data: notification });
}));

module.exports = router;