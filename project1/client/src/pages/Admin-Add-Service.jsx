import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";


export const AdminServiceAdd = () => {
    const [services, setServices] = useState({
        service: '',
        description: '',
        price: '',
        provider: ''
    });
    const navigate = useNavigate();

    const { authorizationToken } = useAuth();



    const handleChange = (e) => {
        const { name, value } = e.target;
        setServices({
            ...services,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("On submit: ",services)
        try {
            const response = await fetch("http://localhost:5000/api/admin/services/addservice", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken
                },
                body: JSON.stringify(services)
            });
            if (response.ok) {
                toast.success("Service added successfully");
                navigate("/admin/services")
            }else {
                const errorData = await response.json();
                toast.error(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.log("Error from frontend add service: ", error);
            toast.error("An unexpected error occurred. Please try again.");
        }

    };
    // Inline styles
    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '400px',
        margin: '0 auto',
        padding: '16px',
        border: '1px solid #ccc',
        borderRadius: '8px'
    };

    const inputStyle = {
        marginBottom: '12px',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc'
    };

    const buttonStyle = {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '8px 12px',
        cursor: 'pointer'
    };
    return (
        <>
            <h1>Admin Service Update</h1>

            <form onSubmit={handleSubmit} style={formStyle}>
                <label>
                    Service Name:
                    <input
                        type="text"
                        name="service"
                        value={services.service}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
                </label>
                <label style={{ display: 'flex' }}>
                    Description:
                    <textarea
                        name="description"
                        value={services.description}
                        onChange={handleChange}
                        rows="4" // Number of rows
                        cols="50" // Number of columns
                        style={{ ...inputStyle }}
                        required
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="text"
                        name="price"
                        value={services.price}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
                </label>
                <label>
                    Provider:
                    <input
                        type="text"
                        name="provider"
                        value={services.provider}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
                </label>
                <button type="submit" style={buttonStyle}>Submit</button>
            </form>
        </>
    );
}