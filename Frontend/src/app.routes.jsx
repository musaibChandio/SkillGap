import { createBrowserRouter } from "react-router";

import Login from "./Features/auth/pages/Login.jsx";
import Register from "./Features/auth/pages/Register.jsx";


export const router = createBrowserRouter([
    {
        path: "/login", 
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    }, 
]);


