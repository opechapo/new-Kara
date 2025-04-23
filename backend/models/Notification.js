const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  type: { 
    type: String, 
    enum: ['cart', 'escrow', 'system', 'other'], 
    default: 'other', 
    required: true 
  }, // Categorize notifications
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);