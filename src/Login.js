// Login.js
import React, { useState, useEffect } from 'react';
import '../templates/Login.css';
import { useHistory } from 'react-router-dom';
import { handleLoginClick } from "../handlers/authUtils"; // Import the login handler
import { handleBackClick } from "../handlers/navigationHandlers"; // Import the navigation handler
import { PATHS } from '../config/pageConfig'; // Import PATHS

function Login() {
  const history = useHistory();

  // State for email and password fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To display login errors

  // Redirect to /jobapplication if the user is already authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log("User is already authenticated, redirecting to Job Application page.");
      history.replace(PATHS.JOB_APPLICATION); // Redirect to job application page using path from config
    }
  }, [history]);

  // Logging the response data from the frontend before login
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting login form with the following data:");
    console.log("Email:", email);
    console.log("Password:", password); // Be cautious with logging passwords in production
    handleLoginClick(e, email, password, setError, history);
  };

  return (
      <div className="login-container">
        <div className="login-box">
          <h1>Welcome!</h1>
          <form onSubmit={handleSubmit}>
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

            {error && <p className="error-message">{error}</p>} {/* Display error message if there's an error */}

            <button type="submit">Log In</button>
            <p className="back-button">
              <button type="button" onClick={() => handleBackClick(history)}>Back</button>
            </p>
            <p className="forgot-password">
              <a href={PATHS.FORGOT_PASSWORD}>Forgot Password?</a> {/* Use PATHS for forgot password link */}
            </p>
          </form>
        </div>
      </div>
  );
}

export default Login;
