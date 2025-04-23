const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const Admin = require('../models/Admin');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/send-verification', authMiddleware, authController.sendVerificationCode);
router.post('/verify-phone', authMiddleware, authController.verifyPhoneNumber);

// Override login to include isAdmin (if used)
router.post('/login', asyncHandler(async (req, res) => {
  const { walletAddress } = req.body; // Assuming wallet-based login
  let user = await User.findOne({ walletAddress });
  if (!user) {
    user = await User.create({ walletAddress });
  }
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const isAdmin = await Admin.exists({ walletAddress }) || false;
  res.json({ token, isAdmin });
}));

module.exports = router;