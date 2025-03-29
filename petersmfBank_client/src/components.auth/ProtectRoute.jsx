import React, { useEffect } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';

const ProtectRoute = ({ children }) => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('valid');
    const location = useLocation();
    
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate, location]);

    return isAuthenticated ? children : <Navigate to='/' />;
}

export default ProtectRoute;