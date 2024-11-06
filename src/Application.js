// Application.js
import React from 'react';
import './Application.css';
import { useHistory } from 'react-router-dom';

function Application() {
  const history = useHistory();

  const handleProfileClick = () => {
    history.push('/userprofile'); // Navigate to the Login page
  };

  const handleLogOut = () => {
    history.push('/');
  }

  return (
    <div className="application-container">
      <nav className="application-nav">
        <button type = "profile" onClick = {handleProfileClick}> Profile  </button>
        <button>Application</button>
        <button type = "logout" onClick = {handleLogOut}>Log Out</button>
      </nav>

      <div className="application-box">
        <h2>Start an Application!</h2>
        <div className="input-row">
          <div className="input-group">
            <label>Write about your experience!</label>
            <textarea placeholder="Describe your experience here..."></textarea>
          </div>
          <div className="input-group">
            <label>Job Posting information</label>
            <textarea placeholder="Paste job posting information here..."></textarea>
          </div>
        </div>
        <button className="generate-button">Generate Resume and Cover Letter</button>
      </div>
    </div>
  );
}

export default Application;
