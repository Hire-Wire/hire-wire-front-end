import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useHistory } from 'react-router-dom';
import '../templates/Landing.css';
import { handleLoginClick, handleRegistrationClick } from "../handlers/navigationHandlers";

function Landing() {
    const history = useHistory();

    return (
        <div>
            {/* Material-UI AppBar */}
            <AppBar
                position="sticky"
                sx={{
                    top: 30,
                    zIndex: 1000,
                    backgroundColor: '#192841',
                    borderRadius: '10px',
                    margin: '0 10px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
                >
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, color: '#F6F7EB' }}>
                    HireWire
                    </Typography>
                    <Button color="inherit" onClick={() => handleLoginClick(history)}>
                    Log In
                    </Button>
                    <Button color="inherit" onClick={() => handleRegistrationClick(history)}>
                    Register
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Landing Content */}
            <div className="landing-container">
            <div className="how-it-works">
                <div className="how-it-works-header">
                    <h2>How It Works</h2>
                    <p>
                    Easily create tailored resumes and cover letters that capture{" "}
                    <span>Your Unique Strengths</span> for each job application.
                    </p>
                </div>
                <div className="how-it-works-cards">
                    <div className="card">
                    <div className="card-header">01</div>
                    <div className="card-content">
                        <h3>Select Job Posting</h3>
                        <p>
                        Choose a job or upload a job description. Hire Wire customizes your
                        resume to fit the role.
                        </p>
                    </div>
                    </div>
                    <div className="card">
                    <div className="card-header">02</div>
                    <div className="card-content">
                        <h3>Add Your Details</h3>
                        <p>
                        Add your experience and skills. Hire Wire's AI highlights what matters
                        most.
                        </p>
                    </div>
                    </div>
                    <div className="card">
                    <div className="card-header">03</div>
                    <div className="card-content">
                        <h3>Generate and Apply</h3>
                        <p>
                        Get a professional resume and cover letter in seconds. Ready to apply!
                        </p>
                    </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Landing;