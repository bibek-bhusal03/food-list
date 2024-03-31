import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

export default function Nutritionist_Route() {
    const isAuthenticated = localStorage.getItem('Nutritionist_token');
    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/consultantLogin" />
    );
}
