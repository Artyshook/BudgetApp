import React from 'react';
import {SignIn} from '../pages/auth/SignIn';
import {SignUp} from "../pages/auth/SignUp";
import { Route, Routes } from 'react-router-dom';
import Header from "../components/layout/Header";


export const AuthenticatedRoutes = () => {
    return (
        <>
            <Header />

            <Routes>
                <Route path="/signin" element={<SignIn/>} />
                <Route path="/signup" element={<SignUp/>} />
                {/* Other authentication-related routes go here */}
            </Routes>
        </>
    );
}

