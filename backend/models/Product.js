const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  shortDescription: { type: String, required: true },
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
  category: { 
    type: String, 
    enum: ['Electronics', 'Smart Phones & Tabs', 'Homes & Gardens', 'Fashion', 'Vehicles'], 
    required: true 
  },
  collection: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection', required: true },
  description: { type: String, trim: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
  paymentToken: { type: String, required: true },
  generalImage: { type: String, required: true },
  escrowSystem: { type: String, enum: ['Deposit', 'Guarantor'], required: true },
  vendorDeposit: { type: Number, required: function() { return this.escrowSystem === 'Deposit'; } },
  customerDeposit: { type: Number, required: function() { return this.escrowSystem === 'Deposit'; } },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  deletedAt: { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);