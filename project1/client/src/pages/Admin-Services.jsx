import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify'

export const AdminServices = () => {
    const [services, setServices] = useState([]);
    const { authorizationToken } = useAuth();

    const getAllServicesData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/services", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            });

            if (response.ok) {
                const services = await response.json();
                console.log(`Service data: `, services);
                setServices(services);
            } else {
                console.error("Failed to fetch services");
            }
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    useEffect(() => {
        getAllServicesData();
    }, [authorizationToken]);

    // Inline styles
    const cardStyle = {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        margin: '8px',
        width: '300px',
        display: 'inline-block',
        verticalAlign: 'top',
        textAlign: 'left'
    };

    const buttonStyle = {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '8px 12px',
        cursor: 'pointer',
        marginRight: '8px'
    };

    const deleteButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#f44336'
    };


    const handleDelete = async (serviceId) => {
        // Logic for deleting the service
        console.log(`Delete service with ID: ${serviceId}`);
        const response = await fetch(`http://localhost:5000/api/admin/services/delete/${serviceId}`, {
            method: "DELETE",
            headers: {
                Authorization: authorizationToken
            },
        })
        const services = await response.json();
        console.log(`users data after delete: ${services}`);

        if (response.ok) {
            toast.success("Service Deleted successfully")
            getAllServicesData();
        } else {
            toast.error("Service not deleted")
        }
    };

    return (
        <div>
            <Link to={`/admin/services/addservice`}><button style={buttonStyle} >Add Service</button></Link>
            <br />

            {services.map((curService, index) => {
                const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);

                const toggleDescription = () => {
                    setDescriptionExpanded(!isDescriptionExpanded);
                };

                return (
                    <div key={index} style={cardStyle}>
                        <h3>{curService.service}</h3>
                        <p>
                            <strong>Description:</strong>
                            {isDescriptionExpanded ? curService.description : `${curService.description.substring(0, 50)}...`}
                            <button onClick={toggleDescription} style={{ ...buttonStyle, backgroundColor: '#6c757d', marginLeft: '8px' }}>
                                {isDescriptionExpanded ? 'Show Less' : 'Show More'}
                            </button>
                        </p>
                        <p><strong>Price:</strong> ${curService.price}</p>
                        <p><strong>Provider:</strong> {curService.provider}</p>
                        <div>
                            <Link to={`/admin/services/${curService._id}/edit`}><button style={buttonStyle}>Edit</button></Link>
                            <button onClick={() => handleDelete(curService._id)} style={deleteButtonStyle}>Delete</button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
