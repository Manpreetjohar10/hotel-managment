const Booking = require('../models/Booking');
const Hotel = require('../models/Hotel');

async function createBooking({ user, hotelId, name, email, checkIn, checkOut, guests }) {
  const hotel = await Hotel.findById(hotelId);
  if (!hotel) {
    const err = new Error('Hotel not found');
    err.status = 404;
    throw err;
  }

  if (typeof hotel.availableRooms === 'number' && hotel.availableRooms <= 0) {
    const err = new Error('No rooms available');
    err.status = 400;
    throw err;
  }

  const booking = new Booking({
    user: user.id,
    hotel: hotelId,
    name,
    email,
    checkIn,
    checkOut,
    guests,
    status: 'Booked'
  });

  await booking.save();

  if (typeof hotel.availableRooms === 'number') {
    hotel.availableRooms = Math.max(0, hotel.availableRooms - 1);
    await hotel.save();
  }

  return booking;
}

async function cancelBooking({ booking, user }) {
  if (!booking) {
    const err = new Error('Booking not found');
    err.status = 404;
    throw err;
  }

  if (booking.user.toString() !== user.id) {
    const err = new Error('Not authorized');
    err.status = 403;
    throw err;
  }

  if (booking.status !== 'Booked') {
    const err = new Error('Only booked reservations can be cancelled');
    err.status = 400;
    throw err;
  }

  booking.status = 'Cancelled';
  booking.updatedAt = Date.now();
  await booking.save();

  const hotel = await Hotel.findById(booking.hotel);
  if (hotel && typeof hotel.availableRooms === 'number') {
    hotel.availableRooms = hotel.availableRooms + 1;
    await hotel.save();
  }

  return booking;
}

module.exports = {
  createBooking,
  cancelBooking
};
