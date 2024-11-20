import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, TextField, Link } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { redirectIfNotAuthenticated } from "../handlers/authUtils";
import axiosInstance from '../utils/setupInstance';
import { copyToClipboard } from '../handlers/copyUtils';

function GeneratedContent({ title, content, onCopy }) {
    return (
        <Box sx={{ marginBottom: 4 }}>
            <Typography variant="h6" align="center" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
                {title}
            </Typography>
            <TextField
                variant="outlined"
                multiline
                fullWidth
                value={content}
                InputProps={{
                    readOnly: true,
                }}
                sx={{ marginBottom: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant="outlined"
                    onClick={onCopy}
                    sx={{
                        fontSize: '0.9rem',
                        textTransform: 'none',
                    }}
                >
                    Copy Text
                </Button>
            </Box>
        </Box>
    );
}

function isInvalidInput(input) {
    return !input.trim() || /^\d+$/.test(input); // Checks if input is empty or only contains numbers
}

function JobApplication() {
    const history = useHistory();
    const [jobTitle, setJobTitle] = useState("");
    const [jobCompany, setJobCompany] = useState("");
    const [jobDescriptionBody, setJobDescriptionBody] = useState("");
    const [customPrompt, setCustomPrompt] = useState("");
    const [generatedResume, setGeneratedResume] = useState("");
    const [generatedCoverLetter, setGeneratedCoverLetter] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Initialize loading state
    const [countdown, setCountdown] = useState(0); // Countdown state

    useEffect(() => {
        redirectIfNotAuthenticated(history, setLoading);
    }, [history]);

    const handleGenerateContent = async () => {
        if (isInvalidInput(jobTitle) || isInvalidInput(jobCompany) || isInvalidInput(jobDescriptionBody)) {
            setError("All required fields must be filled in with valid data.");
            return;
        }

        try {
            setError("");
            setLoading(true);
            setCountdown(15);

            const countdownInterval = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) clearInterval(countdownInterval);
                    return prev - 1;
                });
            }, 1000);

            const token = localStorage.getItem('token');
            const response = await axiosInstance.post(
                "/job-application/generate-content",
                { jobTitle, jobCompany, jobDescriptionBody, customPrompt },
                { headers: { Authorization: `Bearer ${token}` }, withCredentials: true, timeout: 15000 }
            );

            if (response.data.success) {
                setGeneratedResume(response.data.data.resume);
                setGeneratedCoverLetter(response.data.data.coverLetter);
            } else {
                setError(response.data.message || "Failed to generate content.");
            }
        } catch (error) {
            setError("An error occurred while generating content.");
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = (text) => copyToClipboard(text);

    return (
        <Box>
            <AppBar
                position="sticky"
                sx={{
                    top: 30,
                    zIndex: 1000,
                    backgroundColor: '#192841',
                    borderRadius: '10px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Job Application
                    </Typography>
                    <Button color="inherit" onClick={() => history.push('/profile')}>Profile</Button>
                    <Button color="inherit" onClick={() => history.push('/experience')}>Experience</Button>
                    <Button color="inherit" onClick={() => history.push('/application')}>Application</Button>
                    <Button color="inherit" onClick={() => history.push('/logout')}>Log Out</Button>
                </Toolbar>
            </AppBar>

            <Box
                sx={{
                    maxWidth: 600,
                    margin: '50px auto',
                    padding: 4,
                    backgroundColor: '#ffffff',
                    borderRadius: 2,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
                    color: '#000000',
                    marginTop: '100px',
                }}
            >
                <Typography variant="h4" align="center" sx={{ marginBottom: 4, fontWeight: 'bold' }}>
                    Start an Application!
                </Typography>

                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        label="Job Title"
                        fullWidth
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Company / Organization"
                        fullWidth
                        value={jobCompany}
                        onChange={(e) => setJobCompany(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Description"
                        multiline
                        rows={4}
                        fullWidth
                        value={jobDescriptionBody}
                        onChange={(e) => setJobDescriptionBody(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Additional Information"
                        multiline
                        rows={2}
                        fullWidth
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />
                </Box>

                {error && (
                    <Typography variant="body2" color="error" align="center" sx={{ marginBottom: 2 }}>
                        {error}
                    </Typography>
                )}

                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleGenerateContent}
                    disabled={loading}
                    sx={{
                        backgroundColor: '#1976D2',
                        '&:hover': { backgroundColor: '#1565C0' },
                        marginBottom: 2,
                    }}
                >
                    {loading ? (countdown > 0 ? `Please wait... ${countdown}s` : "Generating...") : "Generate"}
                </Button>

                <GeneratedContent
                    title="Generated Resume"
                    content={generatedResume}
                    onCopy={() => handleCopy(generatedResume)}
                />

                <GeneratedContent
                    title="Generated Cover Letter"
                    content={generatedCoverLetter}
                    onCopy={() => handleCopy(generatedCoverLetter)}
                />
            </Box>
        </Box>
    );
}

export default JobApplication;