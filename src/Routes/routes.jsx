import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "../Layout/Main";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Dashboard from "../Layout/Dashboard/Dashboard";
import Addhouse from "../Components/Dashboard/Owner/Addhouse";
import Home from "../Components/Dashboard/Owner/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children:[
            {
                path:'login',
                element:<Login/>
            },
            {
                path:'register',
                element:<Register/>
            }
        ]
    },
    {
        path:'/dashboard',
        element:<Dashboard/>,
        children:[
            {
                path:'home',
                element:<Home/>
            },
            {
                path:'addhouse',
                element:<Addhouse/>
            }
        ]
    }
]);
