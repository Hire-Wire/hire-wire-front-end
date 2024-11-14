// handlers/userProfileHandlers.js
import axios from 'axios';
import {PATHS} from "../config/pageConfig";

// Define the backend URL
const BACKEND_URL = 'http://localhost:8000'; 


/**
 * Handles saving user profile changes.
 * @param {string} userId - The ID of the user.
 * @param {object} profile - The profile data to save.
 * @param {string} token - The authentication token.
 * @param {function} setLoading - Function to set the loading state.
 * @param {function} setError - Function to set the error state.
 */
export const handleSaveUserProfileClick = async (userId, profile, token, setLoading, setError) => {
    setLoading(true);
    try {       

        const response = await axios.put(`${BACKEND_URL}/api/v1/users/${userId}`, profile, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });

        // Update token if it has been refreshed
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }

        // alert('Profile updated successfully!');
    } catch (err) {
        console.error(err);
        // alert('Failed to update profile.');
        setError(err.response ? err.response.data.message : 'Failed to update profile.');
        setTimeout(() => {
            setError('');
        }, 3000);
    } finally {
        setLoading(false);
    }
};

/**
 * Handles deleting the user profile.
 * @param {string} userId - The ID of the user.
 * @param {string} token - The authentication token.
 * @param {object} history - The history object from react-router.
 * @param {function} setLoading - Function to set the loading state.
 * @param {function} setError - Function to set the error state.
 */
export const handleDeleteProfileClick = async (userId, token, history, setLoading, setError) => {
    const confirmDelete = window.confirm(
        'Are you sure you want to delete your profile? This action cannot be undone.'
    );
    if (!confirmDelete) return;

    setLoading(true);
    try {
        await axios.delete(`${BACKEND_URL}/api/v1/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                withCredentials: true,
            },
        });

        // alert('Profile deleted successfully.');
        // Clear localStorage and redirect to signup or another appropriate page
        localStorage.removeItem('token');
        localStorage.removeItem('userId'); // Ensure userId is removed
        history.push('/signup'); // Redirect to signup or another appropriate page
    } catch (err) {
        console.error(err);
        // alert('Failed to delete profile.');
        setError(err.response ? err.response.data.message : 'Failed to delete profile.');
        setTimeout(() => {
            setError('');
        }, 3000);
    } finally {
        setLoading(false);
    }
    history.push(PATHS.HOME); // go back to home page
};

/**
 * Handles navigation to Job Application page.
 * @param {object} history - The history object from react-router.
 */
export const handleJobApplicationClick = (history) => {
    history.push(PATHS.JOB_APPLICATION);
};

/**
 * Handles navigation to Experience page.
 * @param {object} history - The history object from react-router.
 */
export const handleExperienceClick = (history) => {
    history.push(PATHS.EXPERIENCE);
};