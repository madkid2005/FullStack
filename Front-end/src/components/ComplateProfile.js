import React, { useState } from 'react';
import './CompleteProfile.css';

export default function CompleteProfile() {
    // استفاده از useState برای مدیریت مقادیر فرم
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [meliCode, setMeliCode] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [dob, setDob] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // تابع برای ارسال فرم
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token');  // توکن دسترسی که از قبل ذخیره شده
        console.log(token);

        if (!token) {
            setErrorMessage("برای ارسال اطلاعات باید وارد شوید.");
            return;
        }

        const profileData = {
            first_name: firstName,
            last_name: lastName,
            meli_code: meliCode,
            address1: address1,
            address2: address2,
            city: city,
            zipcode: zipcode,
            date_of_birth: dob
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/users/customers/complete-profile/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': "thisisapikeytoaccesstoapiendpoints999",
                    'Authorization': `Bearer ${token}`
                  


                },
                body: JSON.stringify(profileData)
                
            });
            console.log(profileData);
            console.log(token);
            

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message || "پروفایل با موفقیت تکمیل شد!");
                setErrorMessage('');
            } else {
                setErrorMessage(data.message || 'خطا در ارسال داده‌ها');
            }
        } catch (error) {
            setErrorMessage('خطا در اتصال به سرور');
        }
    };
    return (
        <div className="container">
            <h2>تکمیل پروفایل مشتری</h2>

            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}

            <form onSubmit={handleSubmit} className="profile-form">
                <input
                    type="text"
                    placeholder="نام"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="نام خانوادگی"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="کد ملی"
                    value={meliCode}
                    onChange={(e) => setMeliCode(e.target.value)}
                    required
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="آدرس 1"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    required
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="آدرس 2"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    required
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="شهر"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="کد پستی"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    required
                    className="input-field"
                />
                <input
                    type="date"
                    placeholder="تاریخ تولد"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                    className="input-field"
                />
                <button type="submit" className="submit-btn">ارسال</button>
            </form>
        </div>
    );
}
