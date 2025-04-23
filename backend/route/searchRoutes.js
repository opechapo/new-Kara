const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Store = require('../models/Store');
const asyncHandler = require('express-async-handler');

router.get('/', asyncHandler(async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ success: false, message: 'Search query is required' });

  console.log('Search query:', q);

  const products = await Product.find({
    $or: [
      { name: { $regex: q, $options: 'i' } },
      { shortDescription: { $regex: q, $options: 'i' } },
    ],
  })
    .populate('store', 'name description featuredImage bannerImage logo')
    .select('name shortDescription generalImage storeId price paymentToken')
    .lean()
    .then((items) => {
      console.log('Found products:', items.length);
      return items.map((item) => ({ ...item, type: 'product' }));
    });

  const stores = await Store.find({
    $or: [
      { name: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
    ],
  })
    .select('name description featuredImage bannerImage logo')
    .lean()
    .then((items) => {
      console.log('Found stores:', items.length);
      return items.map((item) => ({ ...item, type: 'store' }));
    });

  const results = [...products, ...stores];
  console.log('Total results:', results.length);
  res.json({ success: true, data: results });
}));

module.exports = router;