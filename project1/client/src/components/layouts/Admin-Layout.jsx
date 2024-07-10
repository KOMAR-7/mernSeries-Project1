import { NavLink, Outlet, Navigate } from "react-router-dom";
import { FaUser,FaRegNewspaper   } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { GrContact } from "react-icons/gr";
import { useAuth } from "../../store/auth";

export const AdminLayout = () => {

    const {user, isLoading} = useAuth();
    console.log("This is from admin layout: ", user);

    if(isLoading){
        return <h1>Loading...</h1>
    }
    
    if(!user.isAdmin){
        return <Navigate to="/"/>
    }
    return (
        <>
            <div style={{
                width: '250px',
                height: '100vh',
                position: 'fixed',
                top: 0,
                left: 0,
                backgroundColor: '#111',
                color: '#fff',
                padding: '15px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                marginTop:'60px'
            }}>
                <div>
                    <h2 style={{ borderBottom: '1px solid #444', paddingBottom: '10px'  }}>Menu</h2>
                    <ul style={{ listStyleType: 'none', padding: 0 ,display:'block'}}>
                        <li style={{ padding: '10px 0', borderBottom: '1px solid #444' }}><FaHome /> <NavLink to="/admin/">Home</NavLink></li>
                        <li style={{ padding: '10px 0', borderBottom: '1px solid #444' }}><FaUser /> <NavLink to="/admin/users">Users</NavLink></li>
                        <li style={{ padding: '10px 0', borderBottom: '1px solid #444' }}><GrContact /> <NavLink to="/admin/contacts">Contacts</NavLink></li>
                        <li style={{ padding: '10px 0', borderBottom: '1px solid #444' }}><FaRegNewspaper /> <NavLink to="/admin/services">Services</NavLink></li>
                    </ul>
                </div>
                <div>
                    <p>&copy; 2024 Your Company</p>
                </div>
            </div>
            <div style={{ marginLeft: '250px', padding: '20px' }}>
                <Outlet />
            </div>
        </>
    );
}
