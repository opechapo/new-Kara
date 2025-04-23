// route/userRoutes.js
const express = require('express');
const router = express.Router();
const { getNonce, connectWallet, getUser, updateUser, logoutUser } = require('../controller/userController');
const authMiddleware = require('../middleware/auth');

// Use the controller version
router.get('/nonce/:walletAddress', getNonce);

// Other routes...
router.post('/connect-wallet', connectWallet);
router.get('/profile', authMiddleware, getUser);
router.put('/profile', authMiddleware, updateUser);
router.post('/logout', authMiddleware, logoutUser);

module.exports = router;