import React from 'react';
import {AuthenticatedRoutes} from './AuthenticatedRoutes';
import {BrowserRouter, Routes, Navigate,Route} from "react-router-dom";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth/*" element= {<AuthenticatedRoutes/>} />
                <Route path="/" element={<Navigate to="/auth/signup" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

