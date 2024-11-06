import React, { useState } from 'react';
import './RegisterCustomer.css'; // فایل CSS برای استایل‌دهی
import { useNavigate } from 'react-router-dom';

export default function RegisterCustomer() {
    const [Mobile, setMobile] = useState("");
    const [OtpValue, setOtpValue] = useState("");
    const [ExitsNumber, setExitsNumber] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isNumberSent, setIsNumberSent] = useState(true);
    const navigate = useNavigate();

    function SubmitNumber() {
        fetch("http://127.0.0.1:8000/api/users/register/customer/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ mobile: Mobile })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Response:", data);
            if (data.mobile) {
                setExitsNumber("این شماره موبایل وجود دارد");
            } else {
                setIsOtpSent(true);
                setIsNumberSent(false);
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }

    const GetvalueInput = (e) => {
        const number = e.target.value;
        setMobile(number);
    };

    const GetOtpValue = (e) => {
        const otp = e.target.value;
        setOtpValue(otp);
    };

    function Verify() {
        fetch(`http://127.0.0.1:8000/api/users/verify-otp/customer/`, {  // Assuming you are verifying for a customer
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ mobile: Mobile, otp: OtpValue })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('تایید OTP با شکست مواجه شد');
            }
            return response.json();
        })
        .then(data => {
            console.log("پاسخ تایید:", data);
            if (data.access_token) {
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);
                navigate("/"); // Navigate to home page after successful OTP verification
            } else {
                setExitsNumber("کد تایید اشتباه است.");
            }
        })
        .catch(error => {
            console.error("خطا در هنگام تایید OTP:", error);
        });
    }
    return (
        <div className="register-container">
            <h2>ثبت نام کاربر</h2>
            <input
                className="input-field"
                type="number"
                onChange={GetvalueInput}
                placeholder="شماره موبایل را وارد کنید"
            />
            {isNumberSent && (
                <button className="submit-btn" onClick={SubmitNumber}>ارسال شماره</button>
            )}
            <h1 className="error-message">{ExitsNumber}</h1>

            {isOtpSent && (
                <div className="otp-container">
                    <input
                        className="input-field"
                        type="number"
                        onChange={GetOtpValue}
                        placeholder="کد تایید را وارد کنید"
                    />
                    <button className="submit-btn" onClick={Verify}>تایید کد</button>
                </div>
            )}
        </div>
    );
}
