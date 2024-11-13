// ./handlers/logout.js
import axios from 'axios';
import {PATHS} from "../config/pageConfig";

export const handleLogOut = async (history) => {
    try {
        const response = await axios.post(
            'http://localhost:8000/api/v1/users/logout',
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
        history.replace('/');
    } catch (error) {
        console.error("Logout error:", error);
    }
};

export const handleLoginClick = async (e, email, password, setError, history) => {
    e.preventDefault();

    try {
        const data = { email, password };

        const response = await axios.post(
            "http://localhost:8000/api/v1/users/login",
            data,
            {
                withCredentials: true // Include credentials in the request
            }
        );

        if (response.status === 200) { // Successful login
            const token = response.data.token; // Retrieve token from response
            localStorage.setItem('token', token); // Store token in localStorage
            console.log("Token stored successfully:", token);

            history.push(PATHS.JOB_APPLICATION); // Redirect to application page using path from config
        }
    } catch (error) {
        console.error("Login error:", error.response ? error.response.data.message : error.message);
        setError(error.response ? error.response.data.message : "Login failed. Please try again.");
    }
};

export const redirectIfNotAuthenticated = (history) => {
    const token = localStorage.getItem('token');
    if (!token) {
        history.replace(PATHS.LOGIN); // Redirect to login if no token found
    }
};
