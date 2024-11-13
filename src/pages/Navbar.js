// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../templates/Navbar.css';


function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Landing</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/userprofile">User Profile</Link>
        </li>
        <li>
          <Link to="/jobapplication">Home</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
