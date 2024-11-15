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

    // Initialize profile state with empty strings to avoid null/undefined values
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        status: '',
    });

    // Check if required fields are filled
    const isSaveDisabled = !profile.firstName || !profile.lastName || !profile.email;

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

                // Use empty strings if any of the fields are null or undefined
                const userData = response.data;
                setProfile({
                    firstName: userData.firstName || '',
                    lastName: userData.lastName || '',
                    phoneNumber: userData.phoneNumber || '403',
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

    // Extract userId and token from localStorage
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    // Handler for saving profile
    const onSaveProfile = () => {
        handleSaveUserProfileClick(userId, profile, token, setLoading, setError);
    };

    // Handler for deleting profile
    const onDeleteProfile = () => {
        handleDeleteProfileClick(userId, token, history, setLoading, setError);
    };

    return (
        <div className="profile-container">
            <NavBar />

            <div className="profile-box">
                <h2>User Profile</h2>
                {loading && <p>Loading...</p>}
                {error && <p className="error-message">{error}</p>}
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
                            disabled={isSaveDisabled || loading} // Disable if required fields are empty or loading
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