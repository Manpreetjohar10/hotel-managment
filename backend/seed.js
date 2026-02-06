const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Hotel = require('./models/Hotel');
const User = require('./models/User');
const Blog = require('./models/Blog');

dotenv.config();

const hotels = [
  {
    name: 'Grand Plaza',
    address: '123 Main St',
    city: 'Metropolis',
    rating: 4.5,
    price: 150,
    description: 'Elegant hotel in the city center with modern rooms and rooftop bar.',
    images: ['https://via.placeholder.com/720x360?text=Grand+Plaza'],
    amenities: ['Free Wi-Fi','Rooftop Bar','Gym'],
    totalRooms: 40,
    availableRooms: 10
  },
  {
    name: 'Sea View Resort',
    address: 'Ocean Road',
    city: 'Seaside',
    rating: 4.8,
    price: 220,
    description: 'Beachfront resort with swimming pool and water sports.',
    images: ['https://via.placeholder.com/720x360?text=Sea+View+Resort'],
    amenities: ['Pool','Beach Access','Spa'],
    totalRooms: 60,
    availableRooms: 22
  },
  {
    name: 'Budget Inn',
    address: '45 Budget Ave',
    city: 'Smalltown',
    rating: 3.6,
    price: 60,
    description: 'Comfortable budget rooms for travellers on the go.',
    images: ['https://via.placeholder.com/720x360?text=Budget+Inn'],
    amenities: ['Free Parking'],
    totalRooms: 12,
    availableRooms: 4
  },
  {
    name: 'Mountain Retreat',
    address: 'Highway 7',
    city: 'Hillview',
    rating: 4.7,
    price: 180,
    description: 'Cozy retreat nestled in the mountains with hiking trails nearby.',
    images: ['https://via.placeholder.com/720x360?text=Mountain+Retreat'],
    amenities: ['Hiking','Breakfast Included'],
    totalRooms: 30,
    availableRooms: 8
  },
  {
    name: 'City Lights Suites',
    address: '88 Commerce Blvd',
    city: 'Downtown',
    rating: 4.2,
    price: 130,
    description: 'Business-friendly suites close to conference centers and transit.',
    images: ['https://via.placeholder.com/720x360?text=City+Lights+Suites'],
    amenities: ['Business Center','Gym'],
    totalRooms: 50,
    availableRooms: 15
  }
];

async function seed(){
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-hotel';
  await connectDB(uri);
  await mongoose.connection.db.dropDatabase();
  
  // Seed Hotels
  await Hotel.insertMany(hotels);
  console.log('✅ Seeded 5 hotels');
  
  // Create users with different roles
  const users = [
    { name: 'Super Admin', email: 'admin@example.com', password: 'admin123', role: 'super_admin' },
    { name: 'Manager', email: 'manager@example.com', password: 'manager123', role: 'manager' },
    { name: 'Receptionist', email: 'receptionist@example.com', password: 'receptionist123', role: 'receptionist' },
    { name: 'Waiter', email: 'waiter@example.com', password: 'waiter123', role: 'waiter' },
    { name: 'Cook', email: 'cook@example.com', password: 'cook123', role: 'cook' },
    { name: 'John Doe', email: 'user@example.com', password: 'user123', role: 'user' }
  ];
  
  const createdUsers = await User.insertMany(users);
  console.log('✅ Seeded 6 users with different roles');
  
  // Create sample blogs
  const adminUser = createdUsers[0];
  const blogs = [
    {
      title: 'Top 10 Destinations to Visit in 2026',
      excerpt: 'Discover the most amazing travel destinations this year',
      content: 'Explore breathtaking landscapes, diverse cultures, and unforgettable experiences across the globe. From tropical beaches to mountain peaks, we have curated the ultimate travel guide for 2026.',
      image: 'https://via.placeholder.com/600x400?text=Travel+Destinations',
      author: adminUser._id,
      category: 'Travel',
      published: true
    },
    {
      title: 'How to Plan the Perfect Hotel Stay',
      excerpt: 'Expert tips for booking and enjoying your hotel experience',
      content: 'Learn the secrets of seasoned travelers on how to get the best deals, book perfect accommodations, and make the most of your hotel stay. From choosing the right location to understanding amenities, we cover it all.',
      image: 'https://via.placeholder.com/600x400?text=Hotel+Tips',
      author: adminUser._id,
      category: 'Travel Tips',
      published: true
    },
    {
      title: 'Budget Travel Hacks',
      excerpt: 'Save money while traveling without compromising on quality',
      content: 'Discover insider tips and tricks to reduce your travel expenses. Learn how to find cheap flights, discounted hotels, and maximize your travel budget while still enjoying premium experiences.',
      image: 'https://via.placeholder.com/600x400?text=Budget+Travel',
      author: adminUser._id,
      category: 'Travel Tips',
      published: true
    },
    {
      title: 'Luxury Hotels Around the World',
      excerpt: 'Experience the finest luxury accommodations globally',
      content: 'Indulge in world-class hospitality at the most prestigious hotels. Explore five-star resorts, boutique hotels, and palaces that offer unparalleled comfort and service.',
      image: 'https://via.placeholder.com/600x400?text=Luxury+Hotels',
      author: adminUser._id,
      category: 'Luxury',
      published: true
    }
  ];
  
  await Blog.insertMany(blogs);
  console.log('✅ Seeded 4 sample blogs');
  
  console.log('\n📋 Test Credentials:');
  console.log('Super Admin: admin@example.com / admin123');
  console.log('Manager: manager@example.com / manager123');
  console.log('Receptionist: receptionist@example.com / receptionist123');
  console.log('Waiter: waiter@example.com / waiter123');
  console.log('Cook: cook@example.com / cook123');
  console.log('User: user@example.com / user123');
  
  process.exit(0);
}

seed().catch(err=>{ console.error(err); process.exit(1); });
