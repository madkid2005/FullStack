import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterCustomer.css';
import Notification from './Notification';

export default function RegisterCustomer() {
    const [mobile, setMobile] = useState("");
    const [otpValue, setOtpValue] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const navigate = useNavigate();

    const showError = (message, type) => {
        setErrorMessage(message);
        setMessageType(type);
    };

    const submitMobileNumber = () => {
        if (mobile.length === 11) {
            fetch("http://127.0.0.1:8000/api/users/customers/register-login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-KEY": "thisisapikeytoaccesstoapiendpoints999"
                },
                body: JSON.stringify({ mobile })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.otp_sent) {
                        setIsOtpSent(true);
                        showError("کد تایید ارسال شد", "success");
                        setIsNewUser(data.is_new);
                    } else {
                        showError("خطا در ارسال شماره موبایل", "error");
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    showError("خطا در ارسال شماره موبایل", "error");
                });
        } else {
            showError(`شماره موبایل باید 11 رقم باشد. شما وارد کرده‌اید: ${mobile.length} رقم`, "error");
        }
    };

    const verifyOtp = () => {
        fetch("http://127.0.0.1:8000/api/users/customers/verify-otp/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": "thisisapikeytoaccesstoapiendpoints999"
            },
            body: JSON.stringify({ mobile, otp: otpValue })
        })
            .then(response => response.json())
            .then(data => {
                if (data.tokens) {
                    localStorage.setItem("access_tokenJWT", data.tokens.access);
                    localStorage.setItem("refresh_tokenJWT", data.tokens.refresh);
                    showError("ورود موفقیت‌آمیز", "success");
                    navigate(data.is_new ? "/Products" : "/");
                } else {
                    showError("کد تایید اشتباه است", "error");
                }
            })
            .catch(error => {
                console.error("Error verifying OTP:", error);
                showError("خطا در تایید کد OTP", "error");
            });
    };

    return (
        <div className="container-fluid bg-register">
            {errorMessage && <Notification message={errorMessage} type={messageType} />}
            <div className="row d-flex justify-content-center text-center align-items-center vh-100">
                <div className="col-sm-12 col-md-5 mx-auto my-auto animated-card">
                    <h2 className="animated-title">ثبت نام کاربر</h2>
                    <input
                        className="input-field custom-input"
                        type="number"
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="شماره موبایل را وارد کنید"
                    />
                    {!isOtpSent && (
                        <button className="submit-btn custom-btn" onClick={submitMobileNumber}>
                            ارسال شماره
                        </button>
                    )}
                    {isOtpSent && (
                        <div className="otp-container">
                            <input
                                className="input-field custom-input"
                                type="number"

onChange={(e) => setOtpValue(e.target.value)}
                                placeholder="کد تایید را وارد کنید"
                            />
                            <button className="submit-btn custom-btn" onClick={verifyOtp}>
                                تایید کد
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}