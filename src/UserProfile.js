// UserProfile.js
import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function UserProfile() {
  const history = useHistory();

  // Retrieve user ID and token (Assuming you have user info stored)
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');  

  // Initialize form state
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    status: 'Unemployed', // Default status
  });

  // State for handling loading and errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user profile on component mount
  useEffect(() => {
    if (!token) {
      // If no token, redirect to login
      history.push('/login');
      return;
    }

    axios
      .get(`/api/v1/users/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        const userData = response.data;
        setProfile({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          phoneNumber: userData.phoneNumber || '',
          email: userData.email || '',
          status: userData.status || 'Unemployed',
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load user profile.');
        setLoading(false);
      });
  }, [email, token, history]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };  

  // Handle saving user profile changes
  const handleSaveUserProfileClick = () => {
    setLoading(true);
    axios
      .put(`/api/v1/users/${email}`, profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Update token if it has been refreshed
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        alert('Profile updated successfully!');
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to update profile.');
        setError('Failed to update profile.');
        setLoading(false);
      });
  };
  // Handle deleting the user profile
  const handleDeleteProfileClick = () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete your profile? This action cannot be undone.'
    );
    if (!confirmDelete) return;

    setLoading(true);
    axios
      .delete(`/api/v1/users/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert('Profile deleted successfully.');
        // Clear localStorage and redirect to home or signup
        localStorage.removeItem('token');
        localStorage.removeItem('email'); // Adjust based on your implementation
        history.push('/signup'); // Redirect to signup or another appropriate page
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to delete profile.');
        setError('Failed to delete profile.');
        setLoading(false);
      });
  };


  const handleApplicationClick = () => {
    history.push('/application');
  }

  const handleExperienceClick = () => {
    history.push('/experience');
  }

  const handleLogOut = () => {
    // Clear localStorage and redirect to login or home
    localStorage.removeItem('token');
    localStorage.removeItem('email'); // Adjust based on your implementation
    history.push('/login'); // Redirect to login page
  }

  return (
    <div className="profile-container">
      <nav className="profile-nav">
        <button>Profile</button>
        <button type = "experience" onClick = {handleExperienceClick}> Experience</button>
        <button type = "application" onClick = {handleApplicationClick}> Application</button>
        <button type = "logout" onClick = {handleLogOut}> Log Out</button>
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
