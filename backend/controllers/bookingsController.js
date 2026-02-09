const Booking = require('../models/Booking');
const { createBooking, cancelBooking } = require('../services/bookingService');

exports.create = async (req, res) => {
  try {
    const { hotelId, checkIn, checkOut, guests, name, email } = req.body;
    if (!hotelId) return res.status(400).json({ message: 'Hotel is required' });
    if (!checkIn || !checkOut) return res.status(400).json({ message: 'Check-in and check-out are required' });
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    if (Number.isNaN(inDate.getTime()) || Number.isNaN(outDate.getTime())) {
      return res.status(400).json({ message: 'Invalid dates' });
    }
    if (inDate >= outDate) {
      return res.status(400).json({ message: 'Check-out must be after check-in' });
    }

    const booking = await createBooking({
      user: req.user,
      hotelId,
      name: name || req.user.name,
      email: email || req.user.email,
      checkIn,
      checkOut,
      guests: guests || 1
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.listMine = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('hotel', 'name city address price images')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.cancel = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    const updated = await cancelBooking({ booking, user: req.user });
    res.json(updated);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
