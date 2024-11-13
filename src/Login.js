// Login.js
import React, { useState } from 'react';
import './Login.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const history = useHistory();

  // State for email and password fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To display login errors

  const handleLoginClick = async (e) => {
    e.preventDefault();

    try {
      // Data to send to the backend
      const data = { email, password };

      // Make the login request to backend
      const response = await axios.post("http://localhost:8000/api/v1/users/login", data);

      if (response.status === 200) { // Successful login
        const token = response.data.token; // Retrieve token from response
        localStorage.setItem('token', token); // Store token in localStorage
        console.log("Token stored successfully:", token);

        history.push('/application'); // Redirect to application page
      }
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data.message : error.message);
      setError(error.response ? error.response.data.message : "Login failed. Please try again.");
    }
  };

  const handleBackClick = () => {
    history.push('/');
  }

  return (
      <div className="login-container">
        <div className="login-box">
          <h1>Welcome!</h1>
          <form onSubmit={handleLoginClick}>
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
              <button type="button" onClick={handleBackClick}>Back</button>
            </p>
            <p className="forgot-password">
              <a href="/forgot-password">Forgot Password?</a>
            </p>
          </form>
        </div>
      </div>
  );
}

export default Login;
