// Landing.js
import React from 'react';
import { useHistory } from 'react-router-dom';
import './Landing.css';

function Landing() {
  const history = useHistory();

  const handleLoginClick = () => {
    history.push('/login'); // Navigate to the Login page
  };

  const handleRegistrationClick = () => {
    history.push('/registration'); // Navigate to the Login page
  };  

  return (
    <div className="landing-container">
      <h1>Hire Wire</h1>
      <div className="button-group">
        <button className="login-button" onClick={handleLoginClick}>Log In</button>
        <button className="register-button" onClick={handleRegistrationClick}>Register</button>
      </div>
    </div>
  );
}

export default Landing;
