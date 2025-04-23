const Order = require('../models/Order');
const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');

// Create Order (Buyer only)
const createOrder = asyncHandler(async (req, res) => {
  const { products, shippingAddress } = req.body;

  if (!products || !Array.isArray(products) || products.length === 0 || !shippingAddress) {
    res.status(400);
    throw new Error('Products and shipping address are required');
  }

  if (req.user.role !== 'buyer') {
    res.status(403);
    throw new Error('Only buyers can create orders');
  }

  let totalAmount = 0;
  const orderProducts = [];

  for (const item of products) {
    const product = await Product.findById(item.product);
    if (!product) {
      res.status(404);
      throw new Error(`Product not found: ${item.product}`);
    }
    if (product.stock < item.quantity) {
      res.status(400);
      throw new Error(`Insufficient stock for product: ${product.name}`);
    }
    const price = product.price;
    totalAmount += price * item.quantity;
    orderProducts.push({ product: product._id, quantity: item.quantity, price });

    product.stock -= item.quantity;
    await product.save();
  }

  const order = await Order.create({
    buyer: req.user._id,
    products: orderProducts,
    totalAmount,
    shippingAddress,
  });

  const populatedOrder = await Order.findById(order._id)
    .populate('buyer', 'firstName lastName email')
    .populate('products.product', 'name price');
  res.status(201).json(populatedOrder);
});

// Get Orders (Buyer sees own, Seller sees orders with their products, Admin sees all)
const getOrders = asyncHandler(async (req, res) => {
  let orders;
  if (req.user.role === 'buyer') {
    orders = await Order.find({ buyer: req.user._id })
      .populate('buyer', 'firstName lastName email')
      .populate('products.product', 'name price');
  } else if (req.user.role === 'seller') {
    const sellerProducts = await Product.find({ seller: req.user._id });
    const productIds = sellerProducts.map(p => p._id);
    orders = await Order.find({ 'products.product': { $in: productIds } })
      .populate('buyer', 'firstName lastName email')
      .populate('products.product', 'name price');
  } else if (req.user.role === 'admin') {
    orders = await Order.find()
      .populate('buyer', 'firstName lastName email')
      .populate('products.product', 'name price');
  }
  res.json(orders);
});

// Get Order by ID (Buyer/Seller/Admin with access)
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('buyer', 'firstName lastName email')
    .populate('products.product', 'name price');

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  if (order.buyer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    const sellerProducts = await Product.find({ seller: req.user._id });
    const productIds = sellerProducts.map(p => p._id.toString());
    const orderProductIds = order.products.map(p => p.product.toString());
    if (!orderProductIds.some(id => productIds.includes(id)) || req.user.role !== 'seller') {
      res.status(403);
      throw new Error('Not authorized to view this order');
    }
  }

  res.json(order);
});

// Update Order Status (Seller/Admin only)
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  if (req.user.role !== 'seller' && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to update order status');
  }

  if (req.user.role === 'seller') {
    const sellerProducts = await Product.find({ seller: req.user._id });
    const productIds = sellerProducts.map(p => p._id.toString());
    const orderProductIds = order.products.map(p => p.product.toString());
    if (!orderProductIds.some(id => productIds.includes(id))) {
      res.status(403);
      throw new Error('Not authorized to update this order');
    }
  }

  const { status } = req.body;
  if (!['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(status)) {
    res.status(400);
    throw new Error('Invalid status');
  }

  order.status = status;
  const updatedOrder = await order.save();
  const populatedOrder = await Order.findById(updatedOrder._id)
    .populate('buyer', 'firstName lastName email')
    .populate('products.product', 'name price');
  res.json(populatedOrder);
});

module.exports = { createOrder, getOrders, getOrderById, updateOrderStatus };