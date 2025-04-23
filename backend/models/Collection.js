const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  shortDescription: { type: String, required: true },
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
  description: { type: String, trim: true },
  generalImage: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Collection', collectionSchema);