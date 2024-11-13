// Landing.js
import React from 'react';
import { useHistory } from 'react-router-dom';
import '../templates/Landing.css';
import { handleLoginClick, handleRegistrationClick } from "../handlers/navigationHandlers";

function Landing() {
    const history = useHistory();

    return (
        <div className="landing-container">
            <h1>Hire Wire</h1>
            <div className="button-group">
                <button className="login-button" onClick={() => handleLoginClick(history)}>Log In</button>
                <button className="register-button" onClick={() => handleRegistrationClick(history)}>Register</button>
            </div>
        </div>
    );
}

export default Landing;
