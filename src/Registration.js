// Registration.js
import React from 'react';
import './Registration.css';
import { useHistory } from 'react-router-dom';

function Registration() {
  const history = useHistory();

  const handleRegistrationClick = () => {
    history.push('/');
  };

  const handleBackClick = () => {
    history.push('/');
  }

  return (
    <div className="registration-container">
      <div className="registration-box">
        <h1>Registration</h1>
        <form>
          <label>First Name</label>
          <input type="text" placeholder="First Name" />
          <label>Last Name</label>
          <input type="text" placeholder="First Name" />
          <label>Email</label>
          <input type="text" placeholder="Email" />
          <label>Password</label>
          <input type="password" placeholder="Password" />
          <label>Phone Number</label>
          <input type="password" placeholder="Phone Number" />
          <button type="register" onClick = {handleRegistrationClick}>Register</button>
          <p className="back-button">
            <button type="back" onClick = {handleBackClick}>Back</button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registration;
