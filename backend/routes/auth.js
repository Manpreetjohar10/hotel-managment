const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'keyboardcat';

router.post('/register', async (req, res) => {
  try{
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if(existing) return res.status(400).json({ message: 'Email exists' });
    const user = new User({ name, email, password });
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  }catch(e){ res.status(500).json({ message: e.message }); }
});

router.post('/login', async (req, res) => {
  try{
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ message: 'Invalid credentials' });
    const ok = await user.comparePassword(password);
    if(!ok) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  }catch(e){ res.status(500).json({ message: e.message }); }
});

module.exports = router;
