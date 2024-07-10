import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

export const Logout = () => {
    const { LogoutUser } = useAuth(); // Get the LogoutUser function from the Auth context

    useEffect(() => {
        LogoutUser(); // Call the LogoutUser function when the component mounts
    }, [LogoutUser]); // Depend on LogoutUser to avoid warnings

    return (
        <Navigate to="/login" /> // Redirect the user to the login page
    );
}
