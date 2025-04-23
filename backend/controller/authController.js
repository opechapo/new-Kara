const User = require('./models/User');
const generateToken = require('../utils/generateToken');

const authController = {
  register: async (req, res) => {
    const { email, password, name, role } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ error: 'User already exists' });
      user = await User.create({ email, password, name, role });
      const token = generateToken(user._id);
      res.status(201).json({ token, user: { id: user._id, email, name, role } });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = generateToken(user._id);
      res.json({ token, user: { id: user._id, email, name: user.name, role: user.role } });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = authController;