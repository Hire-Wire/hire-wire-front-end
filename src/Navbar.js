// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/userprofile">User Profile</Link>
        </li>
        <li>
          <Link to="/application">Application</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
