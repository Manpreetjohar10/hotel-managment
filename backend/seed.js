const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Hotel = require('./models/Hotel');

dotenv.config();

const hotels = [
  { name: 'Grand Plaza', address: '123 Main St', city: 'Metropolis', rating: 4.5, price: 150 },
  { name: 'Sea View Resort', address: 'Ocean Road', city: 'Seaside', rating: 4.8, price: 220 },
  { name: 'Budget Inn', address: '45 Budget Ave', city: 'Smalltown', rating: 3.6, price: 60 }
];

async function seed(){
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-hotel';
  await connectDB(uri);
  await mongoose.connection.db.dropDatabase();
  await Hotel.insertMany(hotels);
  console.log('Seeded hotels');
  process.exit(0);
}

seed().catch(err=>{ console.error(err); process.exit(1); });
