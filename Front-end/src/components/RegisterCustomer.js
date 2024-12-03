import React, { useState } from 'react';
import './RegisterCustomer.css';
import Notification from './Notification';  // کامپوننت نوتیفیکیشن
import { useNavigate } from 'react-router-dom';

export default function RegisterCustomer() {
  const [Mobile, setMobile] = useState("");
  const [OtpValue, setOtpValue] = useState("");
  const [ExitsNumber, setExitsNumber] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isNumberSent, setIsNumberSent] = useState(true);
  const [isNewUser, setIsNewUser] = useState();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const showError = (message, type) => {
    setErrorMessage(message);
    setMessageType(type);
  };

  function SubmitNumber() {
    if (Mobile.length === 11) {
        console.log("11 OK");

    fetch("http://127.0.0.1:8000/api/users/customers/register-login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "thisisapikeytoaccesstoapiendpoints999"
      },
      body: JSON.stringify({ mobile: Mobile }),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Response:", data);
        if (data.mobile) {
          showError("این شماره موبایل وجود دارد", "error");
        } else {
          setIsOtpSent(true);
          setIsNumberSent(false);
          showError("کد تایید ارسال شد", "success");
        }
        if (data.is_new) {
          setIsNewUser(true);
        } else {
          setIsNewUser(false);
        }
      })
      .catch(error => {
        console.error("Error:", error);
        showError("خطا در ارسال شماره موبایل", "error");
      });
    } else {
        showError(`شماره موبایل باید 11 رقم باشد. شما وارد کرده‌اید: ${Mobile.length} رقم`, "error");

        return; 
      }
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
    fetch(`http://127.0.0.1:8000/api/users/customers/verify-otp/`, {
      method: "POST",
      headers: {
        'X-API-KEY': "thisisapikeytoaccesstoapiendpoints999",
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
      // بررسی وجود توکن‌ها و ذخیره آنها
      if (data.tokens && data.tokens.access && data.tokens.refresh) {
        // ذخیره توکن‌ها در localStorage
        localStorage.setItem("access_tokenJWT", data.tokens.access);
        localStorage.setItem("refresh_tokenJWT", data.tokens.refresh);

        // نمایش توکن‌ها در کنسول (اختیاری)
        console.log("Access Token:", data.tokens.access);
        console.log("Refresh Token:", data.tokens.refresh);
        } else {
          showError("کد تایید اشتباه است", "error");
        }
        if (isNewUser) {
          navigate("/Products");
        } else {
          navigate("/");
          showError("ورود موفقیت‌آمیز", "success");

        }
      })
      .catch(error => {
        console.error("خطا در هنگام تایید OTP:", error);
        showError("خطا در تایید کد OTP", "error");
      });
  }

  return (
    <div className="container-fluid bg-register">
      {/* نمایش نوتیفیکیشن */}
      {errorMessage && <Notification message={errorMessage} type={messageType} />}

      <div className="row d-flex justify-content-center text-center align-items-center vh-100">
        <div className="col-sm-12 col-md-5 mx-auto my-auto animated-card">
          <h2 className="animated-title">ثبت نام کاربر</h2>
          <input
            className="input-field custom-input"
            type="number"
            onChange={GetvalueInput}
            placeholder="شماره موبایل را وارد کنید"
          />

{isNumberSent && (
            <button className="submit-btn custom-btn" onClick={SubmitNumber}>
              ارسال شماره
            </button>
          )}
          <h1 className="error-message">{ExitsNumber}</h1>

          {isOtpSent && (
            <div className="otp-container">
              <input
                className="input-field custom-input"
                type="number"
                onChange={GetOtpValue}
                placeholder="کد تایید را وارد کنید"
              />
              <button className="submit-btn custom-btn" onClick={Verify}>
                تایید کد
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}