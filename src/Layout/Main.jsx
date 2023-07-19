import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";

const Main = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <div className='min-h-[calc(100vh-300px)]'>
                <Footer />
            </div>
        </div>
    );
};

export default Main;
