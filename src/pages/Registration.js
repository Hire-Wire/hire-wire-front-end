import React, {useEffect, useState} from 'react';
import '../templates/Registration.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { handleBackClick, handleProfileClick } from "../handlers/navigationHandlers";
import {redirectIfAuthenticated} from "../handlers/authUtils";
import {PATHS} from "../config/pageConfig";

function Registration() {
  const history = useHistory();
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    redirectIfAuthenticated(history,PATHS.JOB_APPLICATION,  setLoading);
  }, [history]);

  // State for each input field
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Validation Helper Functions
  const isAlphabetic = (input) => /^[A-Za-z]+$/.test(input); // Ensure input contains only alphabetic characters
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Regex for valid email format

  const handleRegistrationClick = async (e) => {
    e.preventDefault();

    // Perform Validation
    if (!isAlphabetic(firstName)) {
      setError("Please enter a valid first name.");
      return;
    }
    if (!isAlphabetic(lastName)) {
      setError("Please enter a valid last name.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter them.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      // Data to send to the backend
      const data = { firstName, lastName, email, password };

      // Make the registration request to backend
      const response = await axios.post(
          "http://localhost:8000/api/v1/users/register",
          data,
          {
            withCredentials: true, // Include credentials in the request
          }
      );

      if (response.status === 201) {
        const { token, userData } = response.data;
        localStorage.setItem("token", token); // Store token in localStorage
        localStorage.setItem("userId", userData.id); // Store userId in localStorage
        handleProfileClick(history); // Redirect to the profile page
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : "Registration failed. Please try again.");
    }
  };

  return (
      <div className="registration-container">
        <div className="registration-box">
          <h1>Registration</h1>
          <form onSubmit={handleRegistrationClick}>
            <label>First Name</label>
            <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <label>Last Name</label>
            <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <label>Email</label>
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <label>Re-enter Password</label>
            <input
                type="password"
                placeholder="Re-enter Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <p className="error-message">{error}</p>} {/* Display error message */}
            <button type="submit">Register</button>
            <p className="back-button">
              <button type="button" onClick={() => handleBackClick(history)}>Back</button>
            </p>
          </form>
        </div>
      </div>
  );
}

export default Registration;
