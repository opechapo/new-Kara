const mongoose = require('mongoose');

const escrowSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  paymentToken: { type: String, required: true, enum: ['ETH', 'USDT', 'USDC', 'DAI'] },
  quantity: { type: Number, required: true, min: 1 },
  status: {
    type: String,
    enum: ['pending', 'held', 'released', 'refunded', 'disputed'],
    default: 'pending',
  },
  contractAddress: { type: String, required: true },
  deletedAt: { type: Date, default: null }, // Support soft delete
}, { timestamps: true });

module.exports = mongoose.model('Escrow', escrowSchema);