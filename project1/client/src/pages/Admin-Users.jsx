import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { useAuth } from "../store/auth";

export const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const { authorizationToken } = useAuth();
    const getAllUsersData = async () => {
        const response = await fetch("http://localhost:5000/api/admin/users", {
            method: "GET",
            headers: {
                Authorization: authorizationToken
            }
        })
        const data = await response.json();
        console.log(`users data: ${data}`);
        setUsers(data)
    }
    // delete the user on delete button
    const deleteUser = async (id) => {
        // console.log(id);
        const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: authorizationToken
            }
        })
        const data = await response.json();
        console.log(`users data after delete: ${data}`);

        if (response.ok) {
            getAllUsersData();
        }
    }
    useEffect(() => {
        getAllUsersData();
    }, [])
    return (
        <>
            {/* <h1>Hello I am from AdminUsers</h1> */}
            {/* {users.map((curUser, index) => {
                return <h2 key={index}>{curUser.username}</h2>
            })} */}

            <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: 'black' }}>Username</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: 'black' }}>Email</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: 'black' }}>Phone</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: 'black' }}>Edit</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: 'black' }}>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((curUser, index) => (
                            <tr key={index}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{curUser.username}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{curUser.email}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{curUser.phone}</td>
                                
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {/* <button>Edit</button> */}
                                    <Link to={`/admin/users/${curUser._id}/edit`}><button>Edit</button></Link>
                                </td>
                                
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <button onClick={() => deleteUser(curUser._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}