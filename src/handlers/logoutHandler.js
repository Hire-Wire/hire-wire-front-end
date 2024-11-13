// ./handlers/logout.js
import axios from 'axios';

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
