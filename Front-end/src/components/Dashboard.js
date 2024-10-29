// Dashboard.js
import React, { useEffect, useState } from 'react';

function Dashboard() {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8000/api/accounts/dashboard/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUserInfo(data);
            } else {
                alert("Failed to fetch user data.");
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            {userInfo ? (
                <div>
                    <p><strong>Username:</strong> {userInfo.username}</p>
                    <p><strong>Email:</strong> {userInfo.email}</p>
                    <p><strong>Date Joined:</strong> {new Date(userInfo.date_joined).toLocaleDateString()}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Dashboard;
