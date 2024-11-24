import React from "react";
import "./LandingPage.css";
import { Search, Briefcase, Users, TrendingUp, Star, Building, Globe, ChevronRight } from 'lucide-react';
import Navbar from "../components/Navbar";


export default function LandingPage() {
  return (
    <>
      <div className="landing-container">
      {/* Navbar */}
      <Navbar/>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Dream Job Today</h1>
          <p className="hero-subtitle">
            Connect with top employers and discover opportunities that match your skills
          </p>
          
          <div className="search-container">
            <div className="search-bar">
              <Search className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search jobs, companies, or keywords"
              />
              <button className="btn btn-primary search-button">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-container">
              <Briefcase className="feature-icon" />
            </div>
            <h3 className="feature-title">Thousands of Jobs</h3>
            <p className="feature-description">
              Access thousands of job listings from top companies across industries
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-container">
              <Users className="feature-icon" />
            </div>
            <h3 className="feature-title">Expert Network</h3>
            <p className="feature-description">
              Connect with industry professionals and grow your network
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-container">
              <TrendingUp className="feature-icon" />
            </div>
            <h3 className="feature-title">Career Growth</h3>
            <p className="feature-description">
              Get insights and resources to advance your career
            </p>
          </div>
        </div>
      </div>

      {/* Popular Categories Section */}
      <div className="categories-section">
        <div className="section-content">
          <h2 className="section-title">Popular Job Categories</h2>
          <div className="categories-grid">
            {['Technology', 'Healthcare', 'Finance', 'Marketing', 'Education', 'Design'].map((category) => (
              <div key={category} className="category-card">
                <h3>{category}</h3>
                <span className="job-count">2,150 jobs</span>
                <ChevronRight className="category-arrow" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Companies Section */}
      <div className="companies-section">
        <div className="section-content">
          <h2 className="section-title">Featured Companies</h2>
          <div className="companies-grid">
            {[1, 2, 3, 4, 5, 6].map((company) => (
              <div key={company} className="company-card">
                <div className="company-logo">
                  <Building className="company-icon" />
                </div>
                <h3 className="company-name">Company {company}</h3>
                <p className="company-location">
                  <Globe className="location-icon" />
                  New York, USA
                </p>
                <p className="open-positions">12 open positions</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <div className="section-content">
          <h2 className="section-title">Success Stories</h2>
          <div className="testimonials-grid">
            {[1, 2, 3].map((testimonial) => (
              <div key={testimonial} className="testimonial-card">
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="star-icon" />
                  ))}
                </div>
                <p className="testimonial-text">
                  "JobConnect helped me find my dream job within weeks. The platform is intuitive and the job matching is spot-on!"
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar"></div>
                  <div className="author-info">
                    <h4>John Doe</h4>
                    <p>Software Engineer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="section-content">
          <h2 className="cta-title">Ready to Start Your Journey?</h2>
          <p className="cta-description">
            Join thousands of professionals who've found their dream jobs through JobConnect
          </p>
          <div className="cta-buttons">
            <button className="btn btn-primary">Create Account</button>
            <button className="btn btn-outline">Browse Jobs</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-column">
              <h3>JobConnect</h3>
              <p>Find your dream job with ease.</p>
            </div>
            <div className="footer-column">
              <h4>Quick Links</h4>
              <ul>
                <li>Find Jobs</li>
                <li>Browse Companies</li>
                <li>Career Resources</li>
                <li>About Us</li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Categories</h4>
              <ul>
                <li>Technology</li>
                <li>Healthcare</li>
                <li>Finance</li>
                <li>Marketing</li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Contact</h4>
              <ul>
                <li>Support</li>
                <li>FAQ</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 JobConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
