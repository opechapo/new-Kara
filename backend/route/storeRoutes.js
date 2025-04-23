const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Store = require('../models/Store');
const path = require('path');
const authMiddleware = require('../middleware/auth');
const jwt = require('jsonwebtoken');

// Public routes
router.get('/public', asyncHandler(async (req, res) => {
  const stores = await Store.find()
    .limit(10)
    .select('name description featuredImage bannerImage logo owner')
    .populate('owner', 'walletAddress _id');
  res.json({ success: true, data: stores });
}));

router.get('/public/all', asyncHandler(async (req, res) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  const { excludeSelf } = req.query; // New query param to control exclusion
  let excludeOwner = null;

  if (token && excludeSelf === 'true') {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      excludeOwner = decoded._id;
      console.log('Excluding stores owned by:', excludeOwner);
    } catch (err) {
      console.warn('Invalid token provided, proceeding without exclusion:', err.message);
    }
  }

  const query = excludeOwner ? { owner: { $ne: excludeOwner } } : {};
  const stores = await Store.find(query)
    .select('name description featuredImage bannerImage logo owner')
    .populate('owner', 'walletAddress _id');
  console.log(`Fetched ${stores.length} stores for /public/all`);
  res.json({ success: true, data: stores });
}));

router.get('/public/:id', asyncHandler(async (req, res) => {
  const store = await Store.findById(req.params.id)
    .select('name description featuredImage bannerImage logo products owner')
    .populate('owner', 'walletAddress _id');
  if (!store) {
    res.status(404);
    throw new Error('Store not found');
  }
  res.json({ success: true, data: store });
}));

// Authenticated routes
router.get('/', authMiddleware, asyncHandler(async (req, res) => {
  const stores = await Store.find({ owner: req.user._id });
  res.json({ success: true, data: stores });
}));

router.get('/:id', authMiddleware, asyncHandler(async (req, res) => {
  const store = await Store.findById(req.params.id);
  if (!store) {
    res.status(404);
    throw new Error('Store not found');
  }
  if (store.owner.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to view this store');
  }
  res.json({ success: true, data: store });
}));

router.post('/', authMiddleware, asyncHandler(async (req, res) => {
  const { name, description, slogan } = req.body;
  const owner = req.user._id;
  if (!name || !description) {
    res.status(400);
    throw new Error('Name and description are required');
  }
  const storeData = { name, description, slogan, owner };
  const uploadPath = path.join(__dirname, '..', 'Uploads');
  if (req.files) {
    if (req.files.bannerImage) {
      const fileName = `${Date.now()}-${req.files.bannerImage.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const filePath = `/Uploads/${fileName}`;
      await req.files.bannerImage.mv(path.join(uploadPath, fileName));
      storeData.bannerImage = filePath;
    }
    if (req.files.featuredImage) {
      const fileName = `${Date.now()}-${req.files.featuredImage.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const filePath = `/Uploads/${fileName}`;
      await req.files.featuredImage.mv(path.join(uploadPath, fileName));
      storeData.featuredImage = filePath;
    }
    if (req.files.logo) {
      const fileName = `${Date.now()}-${req.files.logo.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const filePath = `/Uploads/${fileName}`;
      await req.files.logo.mv(path.join(uploadPath, fileName));
      storeData.logo = filePath;
    }
  }
  const store = new Store(storeData);
  const createdStore = await store.save();
  res.status(201).json({ success: true, data: createdStore });
}));

router.put('/:id', authMiddleware, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, slogan } = req.body;
  const store = await Store.findById(id);
  if (!store) {
    res.status(404);
    throw new Error('Store not found');
  }
  if (store.owner.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this store');
  }
  store.name = name || store.name;
  store.description = description || store.description;
  store.slogan = slogan || store.slogan;
  const uploadPath = path.join(__dirname, '..', 'Uploads');
  if (req.files) {
    if (req.files.bannerImage) {
      const fileName = `${Date.now()}-${req.files.bannerImage.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const filePath = `/Uploads/${fileName}`;
      await req.files.bannerImage.mv(path.join(uploadPath, fileName));
      store.bannerImage = filePath;
    }
    if (req.files.featuredImage) {
      const fileName = `${Date.now()}-${req.files.featuredImage.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const filePath = `/Uploads/${fileName}`;
      await req.files.featuredImage.mv(path.join(uploadPath, fileName));
      store.featuredImage = filePath;
    }
    if (req.files.logo) {
      const fileName = `${Date.now()}-${req.files.logo.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const filePath = `/Uploads/${fileName}`;
      await req.files.logo.mv(path.join(uploadPath, fileName));
      store.logo = filePath;
    }
  }
  const updatedStore = await store.save();
  res.json({ success: true, data: updatedStore });
}));

router.delete('/:id', authMiddleware, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const store = await Store.findById(id);
  if (!store) {
    res.status(404);
    throw new Error('Store not found');
  }
  if (store.owner.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this store');
  }
  await Store.deleteOne({ _id: id });
  res.status(204).json({ success: true, data: null });
}));

module.exports = router;