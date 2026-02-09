const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Hotel = require('./models/Hotel');
const User = require('./models/User');
const Blog = require('./models/Blog');

dotenv.config();

const hotelImagePool = [
  '/hotels/images/img1.jpg',
  '/hotels/images/img2.jpg',
  '/hotels/images/img3.jpg',
  '/hotels/images/img4.jpg',
  '/hotels/images/img5.jpg',
  '/hotels/images/img6.jpg',
  '/hotels/images/img7.jpg',
  '/hotels/images/img8.jpg',
  '/hotels/images/img9.jpg',
  '/hotels/images/img10.jpg',
  '/hotels/images/img11.jpg',
  '/hotels/images/img12.jpg',
  '/hotels/images/img13.jpg',
  '/hotels/images/img14.jpg',
  '/hotels/images/img15.jpg',
  '/hotels/images/img16.jpg',
  '/hotels/images/img17.jpg',
  '/hotels/images/img18.jpg',
  '/hotels/images/img19.jpg',
  '/hotels/images/img20.jpg',
  '/hotels/images/img21.jpg'
];

const pickImages = (startIdx) => ([
  hotelImagePool[startIdx % hotelImagePool.length],
  hotelImagePool[(startIdx + 1) % hotelImagePool.length],
  hotelImagePool[(startIdx + 2) % hotelImagePool.length]
]);

const hotels = [
  {
    name: 'Grand Plaza',
    address: '123 Main St',
    city: 'Metropolis',
    rating: 4.5,
    price: 150,
    description: 'Elegant hotel in the city center with modern rooms and rooftop bar.',
    images: pickImages(0), // img1, img2, img3
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
    images: pickImages(3), // img4, img5, img6
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
    images: pickImages(6), // img7, img8, img9
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
    images: pickImages(9), // img10, img11, img12
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
    images: pickImages(12), // img13, img14, img15
    amenities: ['Business Center','Gym'],
    totalRooms: 50,
    availableRooms: 15
  },
  {
    name: 'Royal Orchid Palace',
    address: '22 Heritage Lane',
    city: 'New Delhi',
    rating: 4.9,
    price: 280,
    description: 'Heritage luxury hotel with spacious suites, fine dining, and a serene spa.',
    images: pickImages(15), // img16, img17, img18
    amenities: ['Spa','Fine Dining','Concierge'],
    totalRooms: 70,
    availableRooms: 18
  },
  {
    name: 'Skyline Grand',
    address: '9 Marina Boulevard',
    city: 'Dubai',
    rating: 4.8,
    price: 320,
    description: 'Iconic skyline views, rooftop lounge, and premium executive floors.',
    images: pickImages(18), // img19, img20, img21
    amenities: ['Rooftop Lounge','Pool','Executive Lounge'],
    totalRooms: 90,
    availableRooms: 25
  }
];

async function seed(){
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-hotel';
  await connectDB(uri);
  await mongoose.connection.db.dropDatabase();
  
  // Seed Hotels
  await Hotel.insertMany(hotels);
  console.log('OK: Seeded 7 hotels');
  
  // Create users with different roles
  const users = [
    { name: 'Super Admin', email: 'admin@example.com', password: 'admin123', role: 'super_admin' },
    { name: 'Manager', email: 'manager@example.com', password: 'manager123', role: 'manager' },
    { name: 'Receptionist', email: 'receptionist@example.com', password: 'receptionist123', role: 'receptionist' },
    { name: 'Waiter', email: 'waiter@example.com', password: 'waiter123', role: 'waiter' },
    { name: 'Cook', email: 'cook@example.com', password: 'cook123', role: 'cook' },
    { name: 'John Doe', email: 'user@example.com', password: 'user123', role: 'user' }
  ];
  
  const createdUsers = [];
  for (const u of users) {
    const user = new User(u);
    await user.save();
    createdUsers.push(user);
  }
  console.log('OK: Seeded 6 users with different roles');
  
  // Create sample blogs
  const blogImages = [
    '/hotels/images/img1.jpg',
    '/hotels/images/img2.jpg',
    '/hotels/images/img3.jpg',
    '/hotels/images/img4.jpg'
  ];

  const adminUser = createdUsers[0];
  const blogs = [
    {
      title: 'Top 10 Destinations to Visit in 2026',
      excerpt: 'Discover the most amazing travel destinations this year',
      content: 'Explore breathtaking landscapes, diverse cultures, and unforgettable experiences across the globe. From tropical beaches to mountain peaks, we have curated the ultimate travel guide for 2026.',
      image: blogImages[0],
      author: adminUser._id,
      category: 'Travel',
      published: true
    },
    {
      title: 'How to Plan the Perfect Hotel Stay',
      excerpt: 'Expert tips for booking and enjoying your hotel experience',
      content: 'Learn the secrets of seasoned travelers on how to get the best deals, book perfect accommodations, and make the most of your hotel stay. From choosing the right location to understanding amenities, we cover it all.',
      image: blogImages[1],
      author: adminUser._id,
      category: 'Travel Tips',
      published: true
    },
    {
      title: 'Budget Travel Hacks',
      excerpt: 'Save money while traveling without compromising on quality',
      content: 'Discover insider tips and tricks to reduce your travel expenses. Learn how to find cheap flights, discounted hotels, and maximize your travel budget while still enjoying premium experiences.',
      image: blogImages[2],
      author: adminUser._id,
      category: 'Travel Tips',
      published: true
    },
    {
      title: 'Luxury Hotels Around the World',
      excerpt: 'Experience the finest luxury accommodations globally',
      content: 'Indulge in world-class hospitality at the most prestigious hotels. Explore five-star resorts, boutique hotels, and palaces that offer unparalleled comfort and service.',
      image: blogImages[3],
      author: adminUser._id,
      category: 'Luxury',
      published: true
    }
  ];
  
  await Blog.insertMany(blogs);
  console.log('OK: Seeded 4 sample blogs');
  
  console.log('\nTest Credentials:');
  console.log('Super Admin: admin@example.com / admin123');
  console.log('Manager: manager@example.com / manager123');
  console.log('Receptionist: receptionist@example.com / receptionist123');
  console.log('Waiter: waiter@example.com / waiter123');
  console.log('Cook: cook@example.com / cook123');
  console.log('User: user@example.com / user123');
  
  process.exit(0);
}

seed().catch(err=>{ console.error(err); process.exit(1); });

