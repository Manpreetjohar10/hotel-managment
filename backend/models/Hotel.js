const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  city: { type: String },
  description: { type: String },
  images: [{ type: String }],
  amenities: [{ type: String }],
  rating: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  totalRooms: { type: Number, default: 1 },
  availableRooms: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Hotel', HotelSchema);
