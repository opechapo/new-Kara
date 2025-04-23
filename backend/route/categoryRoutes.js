const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

router.get('/categories', asyncHandler(async (req, res) => {
  const categoriesFromProducts = await Product.distinct('category', { deletedAt: null });
  const categories = categoriesFromProducts
    .filter(category => category)
    .map(category => {
      let link;
      switch (category) {
        case 'Electronics': link = '/electronics'; break;
        case 'Smart Phones & Tabs': link = '/smartphonestabs'; break;
        case 'Homes & Gardens': link = '/homeandgarden'; break;
        case 'Fashion': link = '/fashion'; break;
        case 'Vehicles': link = '/vehicles'; break;
        default: link = `/${category.toLowerCase().replace(/ & /g, 'and').replace(/ /g, '')}`;
      }
      return { name: category, link };
    });
  res.json({ success: true, data: categories });
}));

module.exports = router;