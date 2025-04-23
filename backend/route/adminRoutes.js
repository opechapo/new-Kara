const express = require('express');
const router = express.Router();
const { addAdmin, connectAdminWallet } = require('../controller/adminController');
const authMiddleware = require('../middleware/auth');

// Add a new admin (requires existing admin privileges)
router.post('/add-admin', authMiddleware, addAdmin);

// Admin wallet connection
router.post('/connect-wallet', connectAdminWallet);

module.exports = router;