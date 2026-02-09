const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const hotelsRoute = require('./routes/hotels');
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');
const blogsRoute = require('./routes/blogs');
const usersRoute = require('./routes/users');
const messagesRoute = require('./routes/messages');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-hotel';
connectDB(MONGO_URI);

app.use('/api/hotels', hotelsRoute);
app.use('/api/auth', authRoute);
app.use('/api/admin', adminRoute);
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/blogs', blogsRoute);
app.use('/api/users', usersRoute);
app.use('/api/messages', messagesRoute);

app.get('/', (req, res) => res.send('MERN Hotel API'));

const PORT = process.env.PORT || 5060;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
