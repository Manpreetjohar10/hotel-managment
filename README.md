# 🏨 MERN Hotel Booking & Management System

A **production-ready** full-stack hotel booking and management system built with MongoDB, Express, React, and Node.js. Features role-based dashboards, comprehensive blog management, professional UI/UX, and complete hotel browsing with user authentication.

---

## ✨ Key Features

### 🌐 **Frontend - Complete Public & Private Pages**

| Page | Features | Access |
|------|----------|--------|
| **Home** | Hero section, features showcase, testimonials, CTA | Public |
| **Hotels** | Browse all hotels, view details, responsive grid | Public |
| **About Us** | Company mission, values, statistics | Public |
| **Services** | Service catalog, premium packages | Public |
| **Contact Us** | Contact form, info display, Google Maps | Public |
| **Blogs** | Blog listing, category filter, read articles | Public |
| **Admin Dashboard** | Stats, hotel/user/blog management | Super Admin only |
| **Employee Dashboard** | Time-based greeting, quick actions | Employees only |
| **User Dashboard** | Profile, booking history, cancellation | Regular users |

### 🔐 **Authentication & Authorization**

**6 Role-Based User Types:**
1. **Super Admin** - Full system access, statistics dashboard
2. **Manager** - Employee greeting dashboard
3. **Receptionist** - Employee greeting dashboard  
4. **Waiter** - Employee greeting dashboard
5. **Cook** - Employee greeting dashboard
6. **User** - Customer account with booking management

### 📱 **Responsive Design**
- Mobile-first approach
- Breakpoints: 768px (tablet), 480px (mobile)
- Touch-friendly buttons and forms
- Optimized animations for mobile

### 🎨 **Professional UI/UX**
- Blue gradient color scheme (#0b5fff)
- Smooth animations (fadeIn, slideUp, pulse)
- Form validation with inline error messages
- Toast notifications for all actions
- Image carousel with fullscreen
- Consistent button styles and spacing

### 🛠️ **Technical Excellence**
- Clean code architecture
- Separation of concerns (Routes, Controllers, Services, Models)
- RESTful API design
- Protected routes with JWT
- Password hashing with bcrypt
- MongoDB with Mongoose ODM

---

## 🚀 Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 18, React Router, CSS3, Fetch API |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose |
| **Security** | JWT (jsonwebtoken), Bcrypt, CORS |
| **Database** | MongoDB (Local or Atlas) |

---

## 📦 Installation & Setup

### Prerequisites
```bash
- Node.js v14+
- MongoDB (local: mongodb://localhost:27017 or Atlas cloud)
- npm or yarn
- Git
```

### 1️⃣ **Clone & Structure**
```bash
git clone <repo-url>
cd mern-hotel
```

### 2️⃣ **Backend Setup**

```bash
cd backend
npm install
```

Create `.env` file:
```env
MONGO_URI=mongodb://localhost:27017/mern-hotel
JWT_SECRET=your_secret_key_here
PORT=5060
```

### 3️⃣ **Frontend Setup**

```bash
cd frontend
npm install
```

### 4️⃣ **Seed Database**

```bash
cd backend
node seed.js
```

Output:
```
✅ Seeded 5 hotels
✅ Seeded 6 users with different roles
✅ Seeded 4 sample blogs

📋 Test Credentials:
Super Admin: admin@example.com / admin123
...
```

---

## 🏃 **Running the Application**

### Terminal 1: Start Backend
```bash
cd backend
npm start
```
✅ Server running on `http://localhost:5060`

### Terminal 2: Start Frontend
```bash
cd frontend
npm start
```
✅ Application running on `http://localhost:3002`

---

## 🔑 **Test Credentials**

| Email | Password | Role | Dashboard |
|-------|----------|------|-----------|
| admin@example.com | admin123 | Super Admin | /dashboard/admin |
| manager@example.com | manager123 | Manager | /dashboard/employee |
| receptionist@example.com | receptionist123 | Receptionist | /dashboard/employee |
| waiter@example.com | waiter123 | Waiter | /dashboard/employee |
| cook@example.com | cook123 | Cook | /dashboard/employee |
| user@example.com | user123 | User | /dashboard/user |

---

## 📁 **Project Structure**

```
mern-hotel/
│
├── backend/
│   ├── models/
│   │   ├── Hotel.js          # Hotel schema (name, price, rating, rooms, amenities, images)
│   │   ├── User.js           # User with 6 roles (super_admin, manager, etc.)
│   │   ├── Blog.js           # Blog schema (title, content, author, category)
│   │   └── Booking.js        # Booking schema
│   │
│   ├── routes/
│   │   ├── hotels.js         # GET/POST/PUT/DELETE hotels (protected)
│   │   ├── auth.js           # /register, /login
│   │   ├── blogs.js          # Blog CRUD (GET public, POST/PUT/DELETE admin)
│   │   ├── bookings.js       # Booking operations
│   │   └── admin.js          # Admin-only endpoints
│   │
│   ├── controllers/
│   │   ├── hotelsController.js
│   │   ├── blogsController.js
│   │   └── authController.js
│   │
│   ├── middleware/
│   │   └── auth.js           # JWT verification & requireAuth/requireAdmin
│   │
│   ├── config/
│   │   └── db.js             # MongoDB connection setup
│   │
│   ├── seed.js               # Populate DB with sample data
│   ├── server.js             # Express entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.js              # Hero + features + testimonials
│   │   │   ├── About.js             # Company info
│   │   │   ├── Contact.js           # Form + Google Maps
│   │   │   ├── Services.js          # Service cards
│   │   │   ├── Blogs.js             # Blog listing + filter
│   │   │   ├── BlogDetail.js        # Full blog article
│   │   │   ├── DashboardSuperAdmin.js
│   │   │   ├── DashboardEmployee.js
│   │   │   └── DashboardUser.js
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.js            # Navigation + user menu
│   │   │   ├── Footer.js            # Footer with links
│   │   │   ├── HotelList.js         # Hotel grid + search + sort
│   │   │   ├── BookingForm.js       # Hotel booking form
│   │   │   ├── LoginModal.js        # Auth modal
│   │   │   ├── ProtectedRoute.js    # Route guard
│   │   │   ├── ImageCarousel.js     # Image gallery
│   │   │   ├── Modal.js             # Generic modal wrapper
│   │   │   ├── Toasts.js            # Toast notifications
│   │   │   └── AdminPanel.js        # Admin controls
│   │   │
│   │   ├── utils/
│   │   │   └── decodeJwt.js         # JWT payload decoder
│   │   │
│   │   ├── api.js                   # Fetch wrapper with auto-logout
│   │   ├── App.js                   # Router setup
│   │   ├── index.js                 # Entry point
│   │   ├── styles.css               # Core styles
│   │   └── styles-new.css           # Extended styles (pages, dashboards)
│   │
│   ├── public/index.html
│   ├── package.json
│   └── setupProxy.js
│
└── README.md
```

---

## 🌍 **Pages & Routes**

### Public Routes
```
/                    → Home
/about              → About Us
/contact            → Contact
/services           → Services
/blogs              → Blog Listing
/blogs/:id          → Blog Detail
/hotels             → Hotel Browsing
```

### Protected Routes (Require Login)
```
/dashboard/admin     → Super Admin Dashboard (super_admin only)
/dashboard/employee  → Employee Dashboard (manager, receptionist, waiter, cook)
/dashboard/user      → User Dashboard (user role)
```

---

## 🎯 **Dashboard Features**

### 📊 Super Admin Dashboard
- **Statistics Cards**: Total hotels, users, bookings, revenue
- **Booking Status**: Breakdown of booked/successful/cancelled
- **Admin Controls**: 
  - Manage Hotels (add, edit, delete)
  - Manage Users
  - Manage Bookings
  - Manage Blogs

### 👥 Employee Dashboard (Manager, Receptionist, Waiter, Cook)
- **Time-Based Greeting**:
  - 3 AM - 11:50 AM → "Good Morning ☀️"
  - 11:51 AM - 4 PM → "Good Afternoon ☀️"
  - 4:01 PM - 7 PM → "Good Evening 🌆"
  - 7:01 PM - 3 AM → "Good Night 🌙"
- **Current Time/Date Display**
- **Quick Action Cards**

### 👤 User Dashboard
- **Profile Section**
  - View/Edit name, email, phone, address
  - Member since date
- **Booking History**
  - View all bookings with details
  - Status indicators (Booked, Successful, Cancelled)
  - Cancel booking functionality

---

## 🔗 **API Endpoints**

### Hotels
```
GET    /api/hotels              # Get all hotels (public)
GET    /api/hotels/:id          # Get single hotel (public)
POST   /api/hotels              # Create hotel (super_admin)
PUT    /api/hotels/:id          # Update hotel (super_admin)
DELETE /api/hotels/:id          # Delete hotel (super_admin)
```

### Blogs
```
GET    /api/blogs               # Get all blogs (public)
GET    /api/blogs/:id           # Get single blog (public)
POST   /api/blogs               # Create blog (super_admin)
PUT    /api/blogs/:id           # Update blog (super_admin)
DELETE /api/blogs/:id           # Delete blog (super_admin)
```

### Authentication
```
POST   /api/auth/register       # Register new user
POST   /api/auth/login          # Login and get JWT token
```

### Bookings
```
POST   /api/bookings            # Create booking (authenticated)
GET    /api/bookings            # Get user bookings (authenticated)
GET    /api/bookings/:id        # Get booking details (authenticated)
PUT    /api/bookings/:id        # Update booking (authenticated)
DELETE /api/bookings/:id        # Cancel booking (authenticated)
```

---

## 🛡️ **Security Features**

✅ **JWT Authentication** - Secure token-based auth
✅ **Password Hashing** - Bcrypt with salt rounds
✅ **Protected Routes** - Role-based access control
✅ **Auto-Logout** - Session expiry handling
✅ **CORS Enabled** - Cross-origin resource sharing
✅ **Input Validation** - Client-side and server-side
✅ **Error Handling** - Comprehensive error responses

---

## 🎨 **Design System**

### Color Palette
- **Primary**: #0b5fff (Professional Blue)
- **Primary Dark**: #084fb8 (Darker Blue)
- **Background**: #f7f7fb (Light Gray)
- **Text Dark**: #111 (Near Black)
- **Text Muted**: #666 (Gray)
- **Success**: #10b981 (Green)
- **Danger**: #ef4444 (Red)

### Typography
- **Font**: Inter, Roboto, Arial, sans-serif
- **Headings**: 700 weight (Bold)
- **Body**: 400-500 weight
- **Line Height**: 1.6 - 1.8

### Spacing
- **Small**: 8px
- **Medium**: 16px
- **Large**: 24px
- **Extra Large**: 40px+

---

## 🎬 **Features Showcase**

### Hotel Browsing
- Grid layout with responsive columns
- Search by name and city
- Sort by newest, price, rating
- Image thumbnails with hover zoom
- Details modal with full carousel
- Booking form with validation

### Blog Module
- Card-based listing
- Category filtering
- Author and date information
- Beautiful detail page
- Fullscreen image support

### Contact Form
- Email validation
- Message submission
- Google Maps CLI integration
- Success/error feedback

---

## 📱 **Responsive Breakpoints**

```css
Desktop:  > 768px   (Full-width layout, all features)
Tablet:   768px     (Grid columns: 2)
Mobile:   < 480px   (Single column, optimized UI)
```

---

## 🔄 **State Management**

- **React Hooks**: useState, useEffect
- **Event-Driven Auth**: Custom events for logout
- **Local Storage**: JWT token persistence
- **Global API Wrapper**: Automatic header injection

---

## 📝 **Blog Features**

### Admin Capabilities
- ✏️ Create blogs with title, excerpt, content, image, category
- 📝 Edit existing blogs
- 🗑️ Delete blogs
- 📌 Publish/unpublish (publish_flag)

### User Capabilities
- 📖 View all published blogs
- 🏷️ Filter by category
- 📄 Read full article with author info
- 🔍 Search and discovery

---

## 🚀 **Deployment Guide**

### Backend (Heroku/Vercel)
1. Push code to GitHub
2. Connect to Heroku/Vercel
3. Set environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Run `npm run build`
2. Deploy `build/` folder
3. Set API base URL

---

## 🐛 **Troubleshooting**

| Issue | Solution |
|-------|----------|
| Port 5060 in use | Change PORT in .env or kill process |
| MongoDB connection error | Ensure MongoDB is running locally or check Atlas URI |
| CORS errors | Check CORS middleware is enabled in server.js |
| 401 Unauthorized | Check token expiry, re-login required |
| Blog not loading | Verify blog is published (published: true) |

---

## 📚 **Learning Resources**

- [MongoDB Docs](https://docs.mongodb.com/)
- [Express Guide](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [JWT.io](https://jwt.io/)
- [Mongoose](https://mongoosejs.com/)

---

## 👨‍💻 **Development Notes**

### Code Style
- ES6+ JavaScript
- Functional components (React)
- Clear variable naming
- Modular architecture

### Git Commit Convention
```
feat: Add new feature
fix: Fix bug
refactor: Code restructuring
docs: Documentation update
style: CSS/styling changes
chore: Maintenance tasks
```

---

## 📄 **License**

MIT License - Open source project

---

## 💬 **Support**

For issues, questions, or suggestions:
- 📧 Email: support@mernhotel.com
- 📱 Phone: 9534098040
- 🐛 GitHub Issues

---

**Built with ❤️ by the Development Team**

**Happy Booking! 🏨✈️**
