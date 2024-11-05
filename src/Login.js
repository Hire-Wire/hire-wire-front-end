
import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome!</h1>
        <form>
          <label>Email or Username</label>
          <input type="text" placeholder="Email or Username" />

          <label>Password</label>
          <input type="password" placeholder="Password" />

          <button type="submit">Log In</button>
          <p className="forgot-password">
            <a href="/forgot-password">Forgot Password?</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
