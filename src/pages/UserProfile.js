// UserProfile.js
import React, {useEffect, useState} from 'react';
import '../templates/UserProfile.css';
import { useHistory } from 'react-router-dom';
import { handleSaveUserProfileClick, handleDeleteProfileClick} from "../handlers/userProfileHandlers";
import { handleJobApplicationClick, handleExperienceClick } from "../handlers/navigationHandlers";
import {handleLogOut, redirectIfNotAuthenticated} from "../handlers/authUtils";


function UserProfile() {

  useEffect(() => {
    redirectIfNotAuthenticated(history);
  }, [history]);

  // Default values for the user profile
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Smith',
    phoneNumber: '123-456-7890',
    email: 'john.doe@example.com'
  });

  const history = useHistory();

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
          <form>
            <div className="input-row">
              <div className="input-group">
                <label>First Name</label>
                <input type="text" defaultValue={profile.firstName} />
              </div>
              <div className="input-group">
                <label>Last Name</label>
                <input type="text" defaultValue={profile.lastName} />
              </div>
            </div>
            <div className="input-row">
              <div className="input-group">
                <label>Phone Number</label>
                <input type="text" defaultValue={profile.phoneNumber} />
              </div>
              <div className="input-group">
                <label>Email Address</label>
                <input type="email" defaultValue={profile.email} />
              </div>
            </div>
            <div className="input-group">
              <label>Status</label>
              <select>
                <option value="Employed">Employed</option>
                <option value="Student">Student</option>
                <option value="Unemployed">Unemployed</option>
              </select>
            </div>
            <button type="button" className="save-button" onClick={handleSaveUserProfileClick}>
              Save User Profile Changes
            </button>
            <button type="button" className="delete-user-profile-button" onClick={handleDeleteProfileClick}>
              Delete User Profile
            </button>
          </form>
        </div>
      </div>
  );
}

export default UserProfile;
