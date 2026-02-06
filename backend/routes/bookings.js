const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Hotel = require('../models/Hotel');
const { requireAuth } = require('../middleware/auth');

router.post('/', requireAuth, async (req,res)=>{
  try{
    const { hotelId, name, email, checkIn, checkOut, guests } = req.body;
    const hotel = await Hotel.findById(hotelId);
    if(!hotel) return res.status(404).json({ message: 'Hotel not found' });
    if(hotel.availableRooms && hotel.availableRooms <=0) return res.status(400).json({ message: 'No rooms' });
    const booking = new Booking({ hotel: hotelId, name, email, checkIn, checkOut, guests });
    await booking.save();
    if(typeof hotel.availableRooms === 'number'){
      hotel.availableRooms = Math.max(0, (hotel.availableRooms||hotel.totalRooms||1) - 1);
      await hotel.save();
    }
    res.status(201).json(booking);
  }catch(e){ res.status(500).json({ message: e.message }); }
});

module.exports = router;
