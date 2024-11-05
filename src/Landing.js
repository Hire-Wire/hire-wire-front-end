// Landing.js
import React from 'react';
import './Landing.css';

function Landing() {
  return (
    <div className="landing-container">
      <h1>Welcome!</h1>
      <div className="button-group">
        <button className="login-button">Log In</button>
        <button className="register-button">Register</button>
      </div>
    </div>
  );
}

export default Landing;
