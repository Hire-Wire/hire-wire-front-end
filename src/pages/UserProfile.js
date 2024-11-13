import React, { useEffect, useState } from 'react';
import '../templates/UserProfile.css';
import { useHistory } from 'react-router-dom';
import { handleSaveUserProfileClick, handleDeleteProfileClick } from "../handlers/userProfileHandlers";
import { handleJobApplicationClick, handleExperienceClick } from "../handlers/navigationHandlers";
import { handleLogOut, redirectIfNotAuthenticated } from "../handlers/authUtils";
import axios from 'axios';

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
        });

        // Use empty strings if any of the fields are null or undefined
        const userData = response.data;
        setProfile({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          phoneNumber: userData.phoneNumber || '',
          email: userData.email || '',
          status: userData.status || '',
        });
      } catch (error) {
        setError(error.response ? error.response.data.message : "Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [history]);

  return (
      <div className="profile-container">
        <nav className="profile-nav">
          <button>Profile</button>
          <button type="experience" onClick={() => handleExperienceClick(history)}>Experience</button>
          <button type="application" onClick={() => handleJobApplicationClick(history)}>Application</button>
          <button type="logout" onClick={() => handleLogOut(history)}>Log Out</button>
        </nav>

        <div className="profile-box">
          <h2>User Profile</h2>
          {error && <p className="error-message">{error}</p>}
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
                <option value="" disabled>Status</option>
                <option value="Employed">Employed</option>
                <option value="Student">Student</option>
                <option value="Unemployed">Unemployed</option>
              </select>
            </div>
            <button
                type="button"
                className="save-button"
                onClick={() => handleSaveUserProfileClick(profile)}
                disabled={isSaveDisabled} // Disable button if required fields are empty
            >
              Save Profile
            </button>
            <button type="button" className="delete-user-profile-button" onClick={handleDeleteProfileClick}>
              Delete Profile
            </button>
          </form>
        </div>
      </div>
  );
}

export default UserProfile;
