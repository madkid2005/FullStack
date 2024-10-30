import React, { useState } from "react";
import './RegisterSeller.css'; // یا نام فایل CSS خود را در اینجا وارد کنید

const RegisterSeller = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        first_name: "",
        family_name: "",
        age: "",
        gender: "",
        address: "",
        postal_code: "",
        meli_card_number: "",
        user_type: "Seller",
        store_name: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setMessage("");

        try {
            const response = await fetch("http://localhost:8000/api/users/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrors(errorData);
                throw new Error("Registration failed");
            }

            const data = await response.json();
            setMessage("Registration successful!");
        } catch (error) {
            console.error("Error:", error);
            setMessage(error.message);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit} className="form-container">
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}

                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

                <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} />
                {errors.first_name && <p style={{ color: "red" }}>{errors.first_name}</p>}

                <input type="text" name="family_name" placeholder="Family Name" value={formData.family_name} onChange={handleChange} />
                {errors.family_name && <p style={{ color: "red" }}>{errors.family_name}</p>}

                <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
                {errors.age && <p style={{ color: "red" }}>{errors.age}</p>}

                <select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </select>
                {errors.gender && <p style={{ color: "red" }}>{errors.gender}</p>}

                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
                {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}

                <input type="text" name="postal_code" placeholder="Postal Code" value={formData.postal_code} onChange={handleChange} />
                {errors.postal_code && <p style={{ color: "red" }}>{errors.postal_code}</p>}

                <input type="text" name="meli_card_number" placeholder="Meli Card Number" value={formData.meli_card_number} onChange={handleChange} />
                {errors.meli_card_number && <p style={{ color: "red" }}>{errors.meli_card_number}</p>}

                <input type="text" name="user_type" placeholder="User Type" value={formData.user_type} onChange={handleChange} />
                {errors.user_type && <p style={{ color: "red" }}>{errors.user_type}</p>}

                <input type="text" name="store_name" placeholder="Store Name" value={formData.store_name} onChange={handleChange} />
                {errors.store_name && <p style={{ color: "red" }}>{errors.store_name}</p>}

                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterSeller;
