import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DashboardCustomer() {
    const [showProps, setShowProps] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Retrieve tokens from localStorage
                const accessToken = localStorage.getItem('access_tokenJWT');
                const refreshToken = localStorage.getItem('refresh_tokenJWT');

                if (!accessToken || !refreshToken) {
                    alert('لطفاً وارد شوید.');
                    navigate('/login');
                    return;
                }

                // Fetch data using the access token
                const response = await fetch("http://127.0.0.1:8000/api/dashboard/customers/dashboard/", {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'X-API-KEY': "thisisapikeytoaccesstoapiendpoints999"
                    }
                });

                // If the access token is expired, refresh it
                if (response.status === 401) {
                    const refreshResponse = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            'X-API-KEY': "thisisapikeytoaccesstoapiendpoints999"
                        },
                        body: JSON.stringify({ refresh: refreshToken })
                    });

                    if (!refreshResponse.ok) {
                        alert("لطفاً مجدداً وارد شوید.");
                        navigate('/login');
                        return;
                    }

                    const refreshData = await refreshResponse.json();
                    localStorage.setItem("access_tokenJWT", refreshData.access);

                    // Retry fetching data with the new access token
                    const retryResponse = await fetch("http://127.0.0.1:8000/api/dashboard/customers/dashboard/", {
                        method: "GET",
                        headers: {
                            'Authorization': `Bearer ${refreshData.access}`,
                            'X-API-KEY': "thisisapikeytoaccesstoapiendpoints999"
                        }
                    });

                    if (!retryResponse.ok) {
                        throw new Error('Failed to fetch data after refreshing the token.');
                    }

                    const data = await retryResponse.json();
                    setShowProps(data);
                } else {
                    const data = await response.json();
                    setShowProps(data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                alert("خطایی رخ داده است. لطفاً دوباره امتحان کنید.");
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-lg-7'>
                    <div>
                        <h1>{showProps.last_orders}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}