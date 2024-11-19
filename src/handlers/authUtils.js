// ./handlers/logout.js
import axiosInstance from '../utils/setupInstance';
import {PATHS} from "../config/pageConfig";

export const handleLogOut = async (history) => {
    try {
        const response = await axiosInstance.post(
            '/users/logout',
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                withCredentials: true
            }
        );

        console.log(response.data.message); // "Logout successful"

        // Clear token and redirect
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        history.replace('/');
    } catch (error) {
        console.error("Logout error:", error);
    }
};

export const handleLoginClick = async (e, email, password, setError, history) => {
    e.preventDefault();

    try {
        const data = { email, password };

        const response = await axiosInstance.post(
            "/users/login",
            data,
            {
                withCredentials: true // Include credentials in the request
            }
        );

        if (response.status === 200) { // Successful login
            const { token, userData } = response.data; // Retrieve token and userID from response
            localStorage.setItem('token', token); // Store token in localStorage
            localStorage.setItem('userId', userData.id); // Optionally store userID if needed elsewhere
            console.log("Token stored successfully:", token);
            console.log("userId:", userData.id); // Log userID to console

            history.push(PATHS.JOB_APPLICATION); // Redirect to application page using path from config
        }
    } catch (error) {
        console.error("Login error:", error.response ? error.response.data.message : error.message);
        setError(error.response ? error.response.data.message : "Login failed. Please try again.");
    }
};


export const redirectIfNotAuthenticated = (history, setLoading) => {
    const token = localStorage.getItem('token');

    // Simulate async check
    setTimeout(() => {
        if (!token) {
            console.log("No token found; redirecting to login.");
            history.replace(PATHS.LOGIN);
        } else {
            console.log("Token found, user authenticated.");
        }
        if (setLoading) setLoading(false);
    }, 100); // optional delay
};

