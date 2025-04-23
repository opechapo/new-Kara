// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrderById, updateOrderStatus } = require('../controller/orderController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, createOrder);          // Create order (protected)
router.get('/', authMiddleware, getOrders);            // Get orders (protected)
router.get('/:id', authMiddleware, getOrderById);      // Get order by ID (protected)
router.put('/:id/status', authMiddleware, updateOrderStatus); // Update order status (protected)

module.exports = router;