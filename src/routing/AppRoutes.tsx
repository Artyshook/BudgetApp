import React from 'react';
import {AuthRoutes} from '../pages/auth/AuthRoutes';
import {BrowserRouter, Routes, Navigate,Route} from "react-router-dom";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth/*" element= {<AuthRoutes/>} />
                <Route path="/" element={<Navigate to="/auth/signup" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

