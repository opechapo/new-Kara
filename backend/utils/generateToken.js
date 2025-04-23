// utils/generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  const token = jwt.sign({ _id: id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  console.log('Generated token:', token);
  console.log('Decoded token:', jwt.decode(token));
  return token;
};


module.exports = generateToken;