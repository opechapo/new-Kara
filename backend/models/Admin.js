const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Admin', adminSchema);