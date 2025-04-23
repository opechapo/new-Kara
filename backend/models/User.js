const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    // sparse: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    default: null,
  },
  avatarUrl: {
    type: String,
    trim: true,
    default: null,
  },
  nonce: {
    type: String,
    default: null,
  },
  ordersCreated: {
    type: Number,
    default: 0,
  },
  ordersReceived: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  welcomeEmailSent: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// userSchema.index({ email: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('User', userSchema);