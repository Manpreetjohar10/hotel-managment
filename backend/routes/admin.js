const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');
const { requireAuth, requireAdmin } = require('../middleware/auth');

router.use(requireAuth, requireAdmin);

router.get('/hotels', async (req,res)=>{
  const hotels = await Hotel.find();
  res.json(hotels);
});

router.post('/hotels', async (req,res)=>{
  const h = new Hotel(req.body);
  await h.save();
  res.status(201).json(h);
});

module.exports = router;
