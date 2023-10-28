import { Route, Routes } from 'react-router-dom';
import {SignUp} from "../pages/auth/SignUp";
import {SignIn} from "../pages/auth/SignIn";


export const UnauthenticatedRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/auth/signUp" element={<SignUp />} />
        <Route path="/auth/signIn" element={<SignIn />} />
        <Route path="/" element={<SignIn />} />
      </Routes>
    </>
  );
};
