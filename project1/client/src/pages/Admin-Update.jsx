
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const AdminUpdate = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        phone: "",
    });

    const params = useParams();
    console.log("get params: ", params);
    const { authorizationToken } = useAuth();  // Destructure authorizationToken here
    const navigate = useNavigate();
    const getSingleUserData = async () => {
        const response = await fetch(`http://localhost:5000/api/admin/users/${params.id}`, {
            method: "GET",
            headers: {
                Authorization: authorizationToken
            },
        });
        const userData = await response.json();  // Renamed data to userData to avoid shadowing the state variable
        console.log(`user single data: , ${userData}`);
        setData(userData);  // Set the fetched data to the state
    }

    useEffect(() => {
        getSingleUserData();
    }, [params.id]);  // Add params.id as dependency to re-fetch data when id changes

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setData({
            ...data,
            [name]: value
        });
    }

    // update the user:
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/update/${params.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                toast.success("Updated User succesfully")
                navigate('/admin/users')
            } else {
                toast.error("Not updated")
            }
        } catch (error) {
            console.log("Error in updating: ", error);
        }
    }

    return (
        <>
            <section>
                <main>
                    <div className="section-edit">
                        <div className="container grid grid-two-cols">
                            <div className="edit-image reg-img">
                                <img
                                    src="/images/register.png"
                                    alt="a nurse with a cute look"
                                    width="400"
                                    height="500"
                                />
                            </div>
                            <div className="edit-form">
                                <h1>Update User Form:</h1>
                                <br />

                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="username">Username:</label>
                                        <input type="text" name="username" placeholder="Enter username " id="username" value={data.username} onChange={handleInput} required />
                                    </div>

                                    <div>
                                        <label htmlFor="email">Email:</label>
                                        <input type="email" name="email" placeholder="Enter email " id="email" value={data.email} onChange={handleInput} required />
                                    </div>

                                    <div>
                                        <label htmlFor="phone">Phone:</label>
                                        <input type="text" name="phone" placeholder="Enter phone" id="phone" value={data.phone} onChange={handleInput} required />
                                    </div>

                                    <br />
                                    <button type="submit" className="btn btn-submit">Update User</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
};
