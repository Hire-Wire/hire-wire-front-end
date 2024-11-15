import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const NetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const history = useHistory();

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => {
            setIsOnline(false);
            console.log('Network disconnected. Revoking authentication...');

            // Clear authentication data
            localStorage.removeItem('token'); // Remove the token
            sessionStorage.removeItem('userId'); // Remove user session (if stored here)

            // Redirect to the login page
            history.push('/login');
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [history]);

    return (
        !isOnline && (
            <div style={{ backgroundColor: 'red', color: 'white', padding: '10px' }}>
                You are offline. Please log in again when back online.
            </div>
        )
    );
};

export default NetworkStatus;
