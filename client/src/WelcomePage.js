import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css'; // Make sure this file exists

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <div className="animation-text">
        <h1>Welcome to GameStore</h1>
        <p>Find and play your favorite games</p>
      </div>
      <div className="buttons">
        <Link to="/login">
          <button className="btn">Login</button>
        </Link>
        <Link to="/signup">
          <button className="btn">Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
