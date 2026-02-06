import React from 'react';

export default function Services() {
  const services = [
    {
      icon: '🏨',
      title: 'Hotel Booking',
      description: 'Browse and book from thousands of hotels worldwide with instant confirmation'
    },
    {
      icon: '✈️',
      title: 'Travel Packages',
      description: 'Complete travel packages with hotels, flights, and activities bundled together'
    },
    {
      icon: '💳',
      title: 'Flexible Payment',
      description: 'Multiple payment options with installment plans for your convenience'
    },
    {
      icon: '🔄',
      title: 'Free Cancellation',
      description: 'Cancel your bookings free of charge up to 48 hours before check-in'
    },
    {
      icon: '🎁',
      title: 'Loyalty Rewards',
      description: 'Earn points on every booking and redeem them for discounts'
    },
    {
      icon: '🌍',
      title: 'Global Coverage',
      description: 'Access hotels in over 150 countries across the globe'
    },
    {
      icon: '👥',
      title: '24/7 Support',
      description: 'Round-the-clock customer support in multiple languages'
    },
    {
      icon: '🔒',
      title: 'Secure Booking',
      description: 'SSL encrypted payments and data protection for your peace of mind'
    }
  ];

  return (
    <div className="services-page">
      <div className="page-header">
        <h1>Our Services</h1>
        <p>Everything you need for a perfect hotel experience</p>
      </div>

      <div className="services-content">
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>

        {/* Additional Services Section */}
        <section className="additional-services">
          <h2>Premium Services</h2>
          <div className="premium-services-grid">
            <div className="premium-card">
              <h3>⭐ Elite Membership</h3>
              <ul>
                <li>10% discount on all bookings</li>
                <li>Priority customer support</li>
                <li>Exclusive deals and early access</li>
                <li>Complimentary room upgrades</li>
              </ul>
            </div>
            <div className="premium-card">
              <h3>🎯 Business Packages</h3>
              <ul>
                <li>Corporate rates for teams</li>
                <li>Flexible group bookings</li>
                <li>Dedicated account manager</li>
                <li>Consolidated invoicing</li>
              </ul>
            </div>
            <div className="premium-card">
              <h3>🏝️ Vacation Planning</h3>
              <ul>
                <li>Personalized travel itineraries</li>
                <li>Local experience recommendations</li>
                <li>Activity and tour bookings</li>
                <li>Concierge service available</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
