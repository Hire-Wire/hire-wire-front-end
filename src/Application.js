// Application.js
import React from 'react';
import './Application.css';
import { useHistory } from 'react-router-dom';

function Application() {
  const history = useHistory();

  const handleProfileClick = () => {
    history.push('/userprofile');
  };

  const handleExperienceClick = () => {
    history.push('/experience');
  };

  const handleLogOut = () => {
    history.push('/');
  }

  return (
    <div className="application-container">
      <nav className="application-nav">
        <button type = "profile" onClick = {handleProfileClick}> Profile  </button>
        <button type = "experience" onClick = {handleExperienceClick}> Experience</button>
        <button>Application</button>
        <button type = "logout" onClick = {handleLogOut}>Log Out</button>
      </nav>

      <div className="application-box">
        <h2>Start an Application!</h2>
          <div className="additional-info">
            <label>Additional Information</label>
            <textarea placeholder="Write additional information about yourself (Optional)"></textarea>
          </div>
          <div className="job-posting-info">
            <label>Job Posting Information</label>
          </div>
          <div className="job-title-info">
            <label>Job Title</label>
            <input type="text" placeholder="Job title" />
          </div>
          <div className="job-org-info">
            <label>Company / Organization</label>
            <input type="text" placeholder="Company" />
          </div>
          <div className="job-desc">
            <label>Description</label>
            <textarea placeholder="Job description / information..."></textarea>
          </div>
        <button className="generate-button">Generate Resume and Cover Letter</button>

        <div className="cover-letter">
            <label>Generated Cover Letter</label>
            <textarea placeholder="Generated cover letter"></textarea>
        </div>
        <div className="resume">
            <label>Generated Resume</label>
            <textarea placeholder="Generated resume content"></textarea>
        </div>
      </div>
    </div>
  );
}

export default Application;
