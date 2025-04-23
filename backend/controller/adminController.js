// controller/adminController.js
const asyncHandler = require('express-async-handler');
const Admin = require('../models/Admin');
const User = require('../models/User');
const Notification = require('../models/Notification');
const ethers = require('ethers');
const generateToken = require('../utils/generateToken');

const addAdmin = asyncHandler(async (req, res) => {
  if (!req.isAdmin) {
    res.status(403);
    throw new Error('Admin access required');
  }
  const { walletAddress } = req.body;
  const admin = await Admin.create({ walletAddress });
  res.json({ success: true, data: admin });
});

const connectAdminWallet = asyncHandler(async (req, res) => {
  const { walletAddress, signature, message, email } = req.body;
  if (!walletAddress || !signature || !message || !ethers.utils.isAddress(walletAddress)) {
    res.status(400);
    throw new Error('Wallet address, signature, and message are required');
  }

  let user = await User.findOne({ walletAddress: walletAddress.toLowerCase() });
  const isNewUser = !user;

  if (isNewUser) {
    user = new User({
      walletAddress: walletAddress.toLowerCase(),
      email: email ? email.toLowerCase() : undefined,
      nonce: Math.random().toString(36).substring(2, 15),
    });
    await user.save();
  }

  const recoveredAddress = ethers.utils.verifyMessage(message, signature);
  if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
    res.status(401);
    throw new Error('Signature does not match');
  }

  const isAdmin = await Admin.exists({ walletAddress: walletAddress.toLowerCase() });
  if (!isAdmin) {
    res.status(403);
    throw new Error('Not an admin wallet');
  }

  user.nonce = null;
  await user.save();

  const token = generateToken(user._id);
  await Notification.create({
    user: user._id,
    message: `Admin wallet ${walletAddress} connected successfully`,
  });

  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400 * 7), // 7 days
  });
  res.json({ success: true, data: { token, isAdmin: true } });
});

module.exports = { addAdmin, connectAdminWallet };