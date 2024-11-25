import React, { useEffect, useState } from "react";
import "./Notification.css";  // فایل استایل‌ها

const Notification = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  const getNotificationClass = () => {
    switch (type) {
      case "success":
        return "success";
      case "error":
        return "error";
      case "info":
        return "info";
      default:
        return "";
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`notification-box ${getNotificationClass()}`}>
      <div className="icon">
        {type === "success" && <span role="img" className="bi bi-check-lg" aria-label="check"></span>}
        {type === "error" && <span role="img" className="bi bi-dash-circle-fill" aria-label="error"></span>}
        {type === "info" && <span role="img" className="bi bi-info-circle" aria-label="info"></span>}
      </div>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
