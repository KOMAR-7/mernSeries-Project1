import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

export const AdminContacts = () => {
    const [contactData, setContactData] = useState([]);
    const { authorizationToken } = useAuth(); // Assuming useAuth returns an object with authorizationToken

    // Inline CSS for card and button styles
    const cardStyle = {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        margin: '8px',
        width: '200px', // Adjust as needed for your layout
        display: 'inline-block',
        verticalAlign: 'top'
    };

    const buttonStyle = {
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '8px 12px',
        cursor: 'pointer',
        marginTop: '8px' // Added margin for separation
    };

    // Function to fetch contacts data
    const getContactsData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/contacts", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            });
            if (response.ok) {
                const data = await response.json();
                setContactData(data);
            } else {
                console.log("Failed to fetch contacts data");
            }
        } catch (error) {
            console.log("Error fetching contacts:", error);
        }
    };

    // function to delete one contact
    const deleteContactById = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken
                },
            })
            if (response.ok) {
                toast.success("Deleted Succesfully");
                getContactsData();
            }
        } catch (error) {
            console.log("Error from frontend of contact", error);
        }

    }
    
    useEffect(() => {
        getContactsData();
    }, []); // Empty dependency array ensures this effect runs only once

    return (
        <>
            {contactData.map((currContactData, index) => (
                <div key={index} style={cardStyle}>
                    <h3>{currContactData.username}</h3>
                    <p><strong>Email:</strong> {currContactData.email}</p>
                    <p><strong>Message:</strong> {currContactData.message}</p>
                    <button style={buttonStyle} onClick={() => deleteContactById(currContactData._id)}>Delete</button>
                </div>
            ))}
        </>
    );
};
