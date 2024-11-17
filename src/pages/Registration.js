import React, { useState } from 'react';
import '../templates/Registration.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { handleBackClick, handleProfileClick } from "../handlers/navigationHandlers";

function Registration() {
  const history = useHistory();

  // State for each input field
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // For re-entered password
  const [error, setError] = useState(""); // To show error messages

  const handleRegistrationClick = async (e) => {
    e.preventDefault();

    // Validation: Check if required fields are filled
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill out all required fields.");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter them.");
      return;
    }

    // Check if password meets minimum length requirement
    const passwordRegex = /^.{8,}$/; // At least 8 characters
    if (!passwordRegex.test(password)) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      // Data to send to the backend
      const data = { firstName, lastName, email, password };

      console.log("Request data:", data);

      // Make the registration request to backend
      const response = await axios.post(
          "http://localhost:8000/api/v1/users/register",
          data,
          {
            withCredentials: true // Include credentials in the request
          }
      );

      if (response.status === 201) {
        console.log(response.data.message); // Success message
        const { token, userData } = response.data; // Retrieve token and userData from response
        localStorage.setItem('token', token); // Store token in localStorage
        localStorage.setItem('userId', userData.id); // Store userID in localStorage
        console.log("Token stored successfully:", token);
        console.log("userId stored successfully:", userData.id);

        handleProfileClick(history); // Use navigation handler to redirect to the profile page
      }
    } catch (error) {
      console.error("Registration error:", error.response ? error.response.data.message : error.message);
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
            {error && <p className="error-message">{error}</p>}
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
