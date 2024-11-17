import React, { useEffect, useState } from 'react';
import '../templates/UserProfile.css';
import { useHistory } from 'react-router-dom';
import {
    handleSaveUserProfileClick,
    handleDeleteProfileClick,
} from "../handlers/userProfileHandlers";
import { redirectIfNotAuthenticated } from "../handlers/authUtils";
import axios from 'axios';
import NavBar from '../component/NavBar';

function UserProfile() {
    const history = useHistory();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); // State to handle success message

    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: null,
        email: '',
        status: '',
    });

    useEffect(() => {
        redirectIfNotAuthenticated(history, setLoading);
        const userId = localStorage.getItem("userId");

        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8000/api/v1/users/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });

                const userData = response.data;
                setProfile({
                    firstName: userData.firstName || '',
                    lastName: userData.lastName || '',
                    phoneNumber: userData.phoneNumber || null,
                    email: userData.email || '',
                    status: userData.status || 'Unemployed',
                });
            } catch (error) {
                setError(error.response ? error.response.data.message : "Failed to load profile data.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [history]);

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    // Validation Helper Functions
    const isEmptyOrNumeric = (input) => !input.trim() || /^\d+$/.test(input); // Checks for empty or numeric input
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Regex for email validation

    const onSaveProfile = async () => {
        setError("");
        setSuccessMessage("");

        // Perform validation
        if (isEmptyOrNumeric(profile.firstName)) {
            setError("Please enter a valid first name.");
            return;
        }
        if (isEmptyOrNumeric(profile.lastName)) {
            setError("Please enter a valid last name.");
            return;
        }
        if (!isValidEmail(profile.email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setLoading(true);
        try {
            await handleSaveUserProfileClick(userId, profile, token, setLoading, setError);
            setSuccessMessage("Profile saved successfully!");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (err) {
            setError("Failed to save profile.");
        } finally {
            setLoading(false);
        }
    };

    const onDeleteProfile = async () => {
        setLoading(true);
        setError("");
        setSuccessMessage("");

        try {
            await handleDeleteProfileClick(userId, token, history, setLoading, setError);
        } catch (err) {
            setError("Failed to delete profile.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="profile-container">
            <NavBar />

            <div className="profile-box">
                <h2>User Profile</h2>
                {loading && <p>Loading...</p>}
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                {!loading && (
                    <form>
                        <div className="input-row">
                            <div className="input-group">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    placeholder="First Name (required)"
                                    value={profile.firstName}
                                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                                />
                            </div>
                            <div className="input-group">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Last Name (required)"
                                    value={profile.lastName}
                                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="input-row">
                            <div className="input-group">
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    placeholder="Phone Number (optional)"
                                    value={profile.phoneNumber}
                                    onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })}
                                />
                            </div>
                            <div className="input-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    placeholder="Email Address (required)"
                                    value={profile.email}
                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <label>Status</label>
                            <select
                                value={profile.status}
                                onChange={(e) => setProfile({ ...profile, status: e.target.value })}
                            >
                                <option value="" disabled>Select Status</option>
                                <option value="Employed">Employed</option>
                                <option value="Student">Student</option>
                                <option value="Unemployed">Unemployed</option>
                            </select>
                        </div>
                        <button
                            type="button"
                            className="save-button"
                            onClick={onSaveProfile}
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save Profile'}
                        </button>
                        <button
                            type="button"
                            className="delete-user-profile-button"
                            onClick={onDeleteProfile}
                            disabled={loading}
                        >
                            {loading ? 'Deleting...' : 'Delete Profile'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default UserProfile;
