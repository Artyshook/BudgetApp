import React from 'react';
import {BrowserRouter } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {UnauthenticatedRoutes} from "./routing/UnauthenticatedRoutes";
import {AuthenticatedRoutes} from "./routing/AuthenticatedRoutes";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie] = useCookies(['token']);
  const isLoggedIn = !!cookies.token;

  return (
      <div className=" bg-white bg-cover min-h-screen">
        <BrowserRouter>
          {isLoggedIn ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
        </BrowserRouter>
      </div>
  );
}

export default App;
