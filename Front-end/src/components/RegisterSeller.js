import React, { useState } from "react";

export default function RegisterSeller() {
    const [mobile, setMobile] = useState("");
    const [meliCode, setMeliCode] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://127.0.0.1:8000/api/users/sellers/register/", {
            method: "POST",
            headers: {
                "X-API-KEY": "thisisapikeytoaccesstoapiendpoints999",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ mobile, meli_code: meliCode }),
        });

        if (response.ok) {
            alert("ثبت‌نام با موفقیت انجام شد!");
        } else {
            alert("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>ثبت‌نام فروشنده</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder="شماره موبایل"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    style={styles.input}
                    required
                />
                <input
                    type="text"
                    placeholder="کد ملی"
                    value={meliCode}
                    onChange={(e) => setMeliCode(e.target.value)}
                    style={styles.input}
                    required
                />
                <button type="submit" style={styles.button}>
                    ثبت‌نام
                </button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        backgroundColor: "#f4f4f9",
        padding: "20px",
    },
    title: {
        fontSize: "24px",
        color: "#333",
        marginBottom: "20px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: "400px",
    },
    input: {
        width: "100%",
        padding: "10px",
        margin: "10px 0",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "16px",
    },
    button: {
        width: "100%",
        padding: "10px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
    buttonHover: {
        backgroundColor: "#45a049",
    },
};
