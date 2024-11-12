
import React from 'react';
import './Login.css';
import { useHistory } from 'react-router-dom';

function Login() {
  const history = useHistory();

  const handleLoginClick = () => {
    history.push('/application'); // Navigate to the Login page
  };

  const handleBackClick = () => {
    history.push('/');
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome!</h1>
        <form>
          <label>Email</label>
          <input type="text" placeholder="Email" />

          <label>Password</label>
          <input type="password" placeholder="Password" />

          <button type="submit" onClick = {handleLoginClick}>Log In</button>
          <p className="back-button">
            <button type="back" onClick = {handleBackClick}>Back</button>
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
