import React from 'react';
import { useHistory } from 'react-router-dom';
import '../templates/Landing.css';
import { handleLoginClick, handleRegistrationClick } from "../handlers/navigationHandlers";

function Landing() {
    const history = useHistory();

    return (
        <div className="landing-container">
            <nav className="navbar">
                <div className="logo">
                    <img src="/path/to/logo.png" alt="Hire Wire Logo" className="logo-image" />
                    <h1 className="logo-text">Hire Wire</h1>
                </div>
                <div className="nav-buttons">
                    <button className="login-button" onClick={() => handleLoginClick(history)}>Log In</button>
                    <button className="register-button" onClick={() => handleRegistrationClick(history)}>Register</button>
                </div>
            </nav>
            <div className="how-it-works">
                <h2>How It Works</h2>
                <h3>
                    Easily Create Tailored Resumes And Cover Letters That Capture <span>Your Unique Strengths</span> For Each Job Application
                </h3>
                <div className="steps">
                    <div className="step">
                        <div className="step-number">01</div>
                        <h4>Select Job Posting</h4>
                        <p>Choose a job or upload a job description. Hire Wire customizes your resume to fit the role.</p>
                    </div>
                    <div className="step">
                        <div className="step-number">02</div>
                        <h4>Add Your Details</h4>
                        <p>Add your experience and skills. Hire Wire's AI highlights what matters most.</p>
                    </div>
                    <div className="step">
                        <div className="step-number">03</div>
                        <h4>Generate and Download</h4>
                        <p>Get a professional resume and cover letter in seconds. Ready to apply!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;