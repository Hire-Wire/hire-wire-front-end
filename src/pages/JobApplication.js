// JobApplication.js
import React from 'react';
import '../templates/JobApplication.css';
import { useHistory } from 'react-router-dom';
import { handleLogOut } from "../handlers/logoutHandler"; // Import your utility logout function
import { PATHS } from '../config/pageConfig'; // Import PATHS

function JobApplication() {
    const history = useHistory();

    const handleProfileClick = () => {
        history.push(PATHS.USER_PROFILE);
    };

    const handleExperienceClick = () => {
        history.push(PATHS.EXPERIENCE);
    };

    return (
        <div className="application-container">
            <nav className="application-nav">
                <button type="profile" onClick={handleProfileClick}> Profile </button>
                <button type="experience" onClick={handleExperienceClick}> Experience</button>
                <button>Application</button>
                {/* Use the imported handleLogOut function and pass history to it */}
                <button type="logout" onClick={() => handleLogOut(history)}>Log Out</button>
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

export default JobApplication;
