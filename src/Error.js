// Error.js
import React from 'react';
import './Error.css';
import { useHistory } from 'react-router-dom';

function Error() {

  const errorMessage = 'Error Message 101';

  const history = useHistory();

  const handleProfileClick = () => {
    history.push('/userprofile'); // Navigate to the Login page
  };

  const handleLogOut = () => {
    history.push('/');
  }

  const handleApplicationClick = () => {
    history.push('/application');
  }

  return (
    <div className="error-container">
      <nav className="error-nav">
        <button type = "profile" onClick = {handleProfileClick}> Profile  </button>
        <button type = "application" onClick = {handleApplicationClick}> Application</button>
        <button type = "logout" onClick = {handleLogOut}>Log Out</button>
      </nav>

      <div className="error-box">
        <h2>Error</h2>
          <div className="additional-info">
            <label>{errorMessage}</label>
          </div>
      </div>
    </div>
  );
}

export default Error;
