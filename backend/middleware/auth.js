const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

const authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  console.log('Auth token:', token);

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    const user = await User.findById(decoded._id).select('-nonce');
    if (!user) {
      console.warn('User not found for ID:', decoded._id);
      res.status(401);
      throw new Error('User not found');
    }
    req.user = user;
    req.isAdmin = await Admin.exists({ walletAddress: user.walletAddress }) || false;
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    res.status(401);
    throw new Error('Invalid or expired token');
  }
});


module.exports = authMiddleware;