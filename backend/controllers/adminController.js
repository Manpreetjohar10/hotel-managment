const Hotel = require('../models/Hotel');
const User = require('../models/User');
const Booking = require('../models/Booking');

exports.getStats = async (req, res) => {
  try {
    const [totalHotels, totalUsers, totalBookings] = await Promise.all([
      Hotel.countDocuments(),
      User.countDocuments(),
      Booking.countDocuments()
    ]);

    const revenueBookings = await Booking.find({ status: 'Successful' })
      .populate('hotel', 'price');
    const totalRevenue = revenueBookings.reduce((sum, booking) => {
      const price = booking.hotel?.price || 0;
      const nights = Math.max(
        1,
        Math.ceil((new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24))
      );
      return sum + price * nights;
    }, 0);

    const statusAgg = await Booking.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const bookingStatus = { booked: 0, cancelled: 0, successful: 0 };
    statusAgg.forEach((row) => {
      const key = row._id ? row._id.toLowerCase() : '';
      if (key === 'booked') bookingStatus.booked = row.count;
      if (key === 'cancelled') bookingStatus.cancelled = row.count;
      if (key === 'successful') bookingStatus.successful = row.count;
    });

    res.json({ totalHotels, totalUsers, totalBookings, bookingStatus, totalRevenue });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('hotel', 'name city price')
      .populate('user', 'name email role')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Booked', 'Cancelled', 'Successful'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
