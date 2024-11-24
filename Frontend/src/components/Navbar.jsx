import React from 'react'
import { Search, Briefcase, Users, TrendingUp, Star, Building, Globe, ChevronRight } from 'lucide-react';
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
        <div className="nav-content">
          <div className="logo-container">
            <Briefcase className="logo-icon" />
            <span className="logo-text">JobConnect</span>
          </div>
          
          <div className="auth-buttons">
            <button className="btn btn-outline">Sign In</button>
            <button className="btn btn-primary">Register</button>
          </div>
        </div>
      </nav>
  )
}

export default Navbar
