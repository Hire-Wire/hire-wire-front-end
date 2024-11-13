// Error.js
import React from 'react';
import '../templates/Error.css';
import { useHistory } from 'react-router-dom';
import { handleLogOut } from "../handlers/logoutHandler"; // Import the logout function
import { handleProfileClick, handleJobApplicationClick } from "../handlers/navigationHandlers"; // Import navigation handlers

function Error() {
    const errorMessage = 'Error Message 101';
    const history = useHistory();

    return (
        <div className="error-container">
            <nav className="error-nav">
                {/* Use the imported navigation handlers */}
                <button type="profile" onClick={() => handleProfileClick(history)}>Profile</button>
                <button type="application" onClick={() => handleJobApplicationClick(history)}>Application</button>
                <button type="logout" onClick={() => handleLogOut(history)}>Log Out</button>
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
