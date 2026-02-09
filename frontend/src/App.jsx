import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import HotelDetail from './pages/HotelDetail';
import UIShowcase from './pages/UIShowcase';
import DashboardSuperAdmin from './pages/DashboardSuperAdmin';
import DashboardEmployee from './pages/DashboardEmployee';
import DashboardUser from './pages/DashboardUser';
import HotelList from './components/HotelList';

export default function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <Navbar onSignInClick={() => setShowLoginModal(true)} />
        <div className="app-root">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/hotels" element={<HotelList />} />
            <Route path="/hotels/:id" element={<HotelDetail />} />
            <Route path="/ui-showcase" element={<UIShowcase />} />
            
            {/* Protected Dashboard Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard/admin" element={<DashboardSuperAdmin />} />
              <Route path="/dashboard/employee" element={<DashboardEmployee />} />
              <Route path="/dashboard/user" element={<DashboardUser />} />
            </Route>
          </Routes>
        </div>
        <Footer />
        {showLoginModal && (
          <LoginModal onClose={() => setShowLoginModal(false)} />
        )}
      </div>
    </Router>
  );
}
