import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contextApi/UserContext';
import { useEffect } from 'react';

export const ProtectRoutes = () => {
    const token = useAuth();
    useEffect(() => { }, []);


    return token ? <Outlet /> : <Navigate to='/login' exact />
};