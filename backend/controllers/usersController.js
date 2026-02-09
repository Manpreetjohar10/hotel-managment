const User = require('../models/User');
const { updateProfile } = require('../services/userService');

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateMe = async (req, res) => {
  try {
    const user = await updateProfile(req.user.id, req.body);
    res.json(user);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
