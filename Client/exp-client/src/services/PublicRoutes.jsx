import React from 'react'
import { useAuth } from '../contextApi/UserContext';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = () => {
    const token = useAuth();

    return token ? <Navigate to='/home' /> : <Outlet />
}

export default PublicRoutes