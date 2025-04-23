// models/Store.js
const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  slogan: { type: String, trim: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bannerImage: { type: String, trim: true },
  featuredImage: { type: String, trim: true },
  logo: { type: String, trim: true },
}, { timestamps: true });

module.exports = mongoose.model('Store', storeSchema);