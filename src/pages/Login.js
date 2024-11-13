// Login.js
import React, { useState, useEffect } from 'react';
import '../templates/Login.css';
import { useHistory } from 'react-router-dom';
import { handleLoginClick } from "../handlers/loginHandler"; // Import the login handler
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
      history.replace(PATHS.JOB_APPLICATION); // Redirect to job application page using path from config
    }
  }, [history]);

  return (
      <div className="login-container">
        <div className="login-box">
          <h1>Welcome!</h1>
          <form onSubmit={(e) => handleLoginClick(e, email, password, setError, history)}>
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
