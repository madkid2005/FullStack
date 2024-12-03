import React, { useEffect, useState } from 'react';

export default function DashboardCustomer() {
    const [datadashbord, setDatadashboard] = useState([]);
    const [chatsupporters, setChatsupporters] = useState("");
    const [notifications, setNotifications] = useState("");

    const [Lastorders, setLastorders] = useState("");
    const [lastpayments, setLastpayments] = useState("");
    
    const [activeTab, setActiveTab] = useState("support"); // برای کنترل تب فعال
    const token = localStorage.getItem('access_tokenJWT');

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/dashboard/customers/dashboard/", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'X-API-KEY': "thisisapikeytoaccesstoapiendpoints999",
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setDatadashboard(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const chatsupporter = () => {
        const url = datadashbord.chat_support;
        console.log(url);
        fetch(`http://127.0.0.1:8000/api/dashboard${url}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'X-API-KEY': "thisisapikeytoaccesstoapiendpoints999",
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setChatsupporters(data);
            });
    };

    const notif = () => {
        const url = datadashbord.notifications;
        console.log(url);
        fetch(`http://127.0.0.1:8000/api/dashboard${url}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'X-API-KEY': "thisisapikeytoaccesstoapiendpoints999",
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setNotifications(data);
            });
    };

    const order = () => {
        const url = datadashbord.last_orders;
        console.log(url);
        fetch(`http://127.0.0.1:8000/api/dashboard${url}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'X-API-KEY': "thisisapikeytoaccesstoapiendpoints999",
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setLastorders(data);
            });
    };

    const payment = () => {
        const url = datadashbord.last_payments;
        console.log(url);
        fetch(`http://127.0.0.1:8000/api/dashboard${url}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'X-API-KEY': "thisisapikeytoaccesstoapiendpoints999",
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setLastpayments(data);
            });
    };

    

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-lg-4'>
                    <div className='d-grid'>
                        {/* دکمه‌ها */}
                        <button 
                            onClick={() => { setActiveTab("support"); chatsupporter(); }} 
                            className='w-100 bg-primary my-1'>
                            پشتیبانی
                        </button>
                        <button 
                            onClick={() => { setActiveTab("notifications"); notif(); }} 
                            className='w-100 my-1'>
                            Notifications
                        </button>
                        <button 
                            onClick={() => {setActiveTab("other") ; order(); }} 
                            className='w-100 my-1'>
                            Other
                        </button>
                        <button 
                            onClick={() =>{ setActiveTab("empty"); payment(); }} 
                            className='w-100 my-1'>
                            Empty
                        </button>
                    </div>
                </div>

                <div className='col-lg-8'>
                    {/* نمایش محتوا بر اساس تب فعال */}
                    {activeTab === "support" && <div>{chatsupporters.message}</div>}
                    {activeTab === "notifications" && <div>{notifications.message}</div>}
                    {activeTab === "other" && <div>{Lastorders.amount}</div>}
                    {activeTab === "empty" && <div>{lastpayments.s}</div>}
                </div>
            </div>
        </div>
    );
}
