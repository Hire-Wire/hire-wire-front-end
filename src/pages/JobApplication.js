import React, { useState, useEffect } from 'react';
import '../templates/JobApplication.css';
import { useHistory } from 'react-router-dom';
import { redirectIfNotAuthenticated } from "../handlers/authUtils";
import axios from 'axios';
import NavBar from "../component/NavBar";
import { copyToClipboard } from '../handlers/copyUtils';

function GeneratedContent({ label, content, onCopy }) {
    return (
        <div className="generated-content">
            <label>
                {label}
                <button onClick={onCopy} className="copy-button">Copy Text</button>
            </label>
            <textarea readOnly value={content} className="generated-textarea"></textarea>
        </div>
    );
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
    const [loading, setLoading] = useState(true); // Initialize loading state

    useEffect(() => {
        redirectIfNotAuthenticated(history, setLoading);
    }, [history]);

    const handleGenerateContent = async () => {
        if (!jobTitle || !jobCompany || !jobDescriptionBody) {
            setError("Please fill in the job title, company, and description fields.");
            return;
        }

        try {
            setError("");
            setLoading(true);

            const token = localStorage.getItem('token');
            const response = await axios.post(
                "http://localhost:8000/api/v1/job-application/generate-content",
                { jobTitle, jobCompany, jobDescriptionBody, customPrompt },
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                setGeneratedResume(response.data.data.resume);
                setGeneratedCoverLetter(response.data.data.coverLetter);
            } else {
                setError(response.data.message || "Failed to generate content.");
            }
        } catch (error) {
            setError(error.response?.data.message || "An error occurred while generating content.");
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = (text) => {
        copyToClipboard(text); // Just copy text, no message or timeout needed
    };

    return (
        <div className="application-container">
            <NavBar />
            <div className="application-box">
                <h2>Start an Application!</h2>
                <div className="job-posting-info">
                    <label>Job Posting Information</label>
                </div>
                <div className="job-title-info">
                    <label>Job Title</label>
                    <input
                        type="text"
                        placeholder="Job title (required)"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                    />
                </div>
                <div className="job-org-info">
                    <label>Company / Organization</label>
                    <input
                        type="text"
                        placeholder="Company (required)"
                        value={jobCompany}
                        onChange={(e) => setJobCompany(e.target.value)}
                    />
                </div>
                <div className="job-desc">
                    <label>Description</label>
                    <textarea
                        placeholder="Job description / information... (required)"
                        value={jobDescriptionBody}
                        onChange={(e) => setJobDescriptionBody(e.target.value)}
                    ></textarea>
                </div>
                <div className="additional-info">
                    <label>Additional Information</label>
                    <textarea
                        placeholder="Write additional information about yourself (Optional). This prompt will help us tailor your application to your needs."
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                    ></textarea>
                </div>
                <button
                    className="generate-button"
                    onClick={handleGenerateContent}
                    disabled={loading}
                >
                    {loading ? "Generating..." : "Generate"}
                </button>

                {error && <p className="error-message">{error}</p>}

                <GeneratedContent
                    label="Generated Resume"
                    content={generatedResume}
                    onCopy={() => handleCopy(generatedResume)}
                />

                <GeneratedContent
                    label="Generated Cover Letter"
                    content={generatedCoverLetter}
                    onCopy={() => handleCopy(generatedCoverLetter)}
                />
            </div>
        </div>
    );
}

export default JobApplication;
