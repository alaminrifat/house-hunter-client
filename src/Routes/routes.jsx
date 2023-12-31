import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "../Layout/Main";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Dashboard from "../Layout/Dashboard/Dashboard";
import Addhouse from "../Components/Dashboard/Owner/Addhouse";
import Home from "../Components/Dashboard/Owner/Home";
import ManageBookings from "../Components/Dashboard/Renter/ManageBookings";
import LandingPage from "../Components/Home/LandingPage";
import About from "../Components/About";
import ErrorPage from "../Components/ErrorPage";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement:<ErrorPage/>,
        children: [
            {
                path:'/',
                element: <LandingPage/>
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "about",
                element:<About/>
            }
        ],
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
            {
                path: "home",
                element: <Home />,
            },
            {
                path: "addhouse",
                element: <Addhouse />,
            },
        ],
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
            {
                path: "managebookings",
                element: <ManageBookings></ManageBookings>,
            },
        ],
    },
]);
