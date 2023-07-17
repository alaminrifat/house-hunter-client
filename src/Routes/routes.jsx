import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "../Layout/Main";
import Login from "../Auth/Login";
import Register from "../Auth/Register";

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
]);
