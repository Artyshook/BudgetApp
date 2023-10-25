import React from 'react';
import {SignIn} from './SignIn';
import {SignUp} from "./SignUp";
import {Routes, Route } from 'react-router-dom';


export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="/signin" element={<SignIn/>} />
            <Route path="/signup" element={<SignUp/>} />
            {/* Other authentication-related routes go here */}
        </Routes>
    );
}

