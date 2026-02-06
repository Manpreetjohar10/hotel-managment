import React from 'react';

export default function About() {
  return (
    <div className="about-page">
      <div className="page-header">
        <h1>About Us</h1>
        <p>Learn more about our hotel booking platform</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            At MERN Hotel, our mission is to make hotel booking simple, affordable, and enjoyable for travelers worldwide. 
            We partner with premium hotels to provide exceptional experiences at unbeatable prices.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2024, MERN Hotel started as a small startup with a big vision. Today, we serve thousands of guests 
            daily, connecting them with their perfect accommodations. Our commitment to excellence and customer satisfaction 
            has made us one of the most trusted hotel booking platforms.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Trust</h3>
              <p>We believe in transparency and honest dealing with our customers</p>
            </div>
            <div className="value-card">
              <h3>Excellence</h3>
              <p>We strive for the highest quality in everything we do</p>
            </div>
            <div className="value-card">
              <h3>Innovation</h3>
              <p>We continuously improve our platform with cutting-edge technology</p>
            </div>
            <div className="value-card">
              <h3>Customer Focus</h3>
              <p>Your satisfaction is our top priority</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>By The Numbers</h2>
          <div className="stats-grid">
            <div className="stat">
              <h3>50K+</h3>
              <p>Hotels Worldwide</p>
            </div>
            <div className="stat">
              <h3>1M+</h3>
              <p>Happy Guests</p>
            </div>
            <div className="stat">
              <h3>150+</h3>
              <p>Countries Covered</p>
            </div>
            <div className="stat">
              <h3>24/7</h3>
              <p>Customer Support</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
