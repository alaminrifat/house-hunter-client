import React, { useContext } from "react";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { PiCalendarCheckBold } from "react-icons/pi";
import { BsBuildingGear, BsFillHouseAddFill } from "react-icons/bs";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../Auth/AuthProvider";
import ManageBookings from "../../Components/Dashboard/Renter/ManageBookings";

const Dashboard = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    // TODO: add logout
    const handleLogout = () => {
        const res = logOut();
        toast.success(res);
        navigate("/login");
    };

    const navOptions = (
        <>
            {/* house owner */}
            {console.log(user?.role)}
            {user?.role === "House Owner" ? (
                <>
                    {" "}
                    <li>
                        <NavLink to="home">
                            <BsBuildingGear></BsBuildingGear> Control Panel
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="addhouse">
                            <BsFillHouseAddFill></BsFillHouseAddFill> Add house
                        </NavLink>
                    </li>
                </>
            ) : (
                <></>
            )}
            {user?.role === "House Renter" ? (
                <>
                    {" "}
                    <li>
                        <NavLink to="managebookings">
                            <PiCalendarCheckBold></PiCalendarCheckBold> Manage
                            Bookings
                        </NavLink>
                    </li>
                </>
            ) : (
                <></>
            )}
        </>
    );
    return (
        <div className="drawer lg:drawer-open ">
            <ToastContainer></ToastContainer>
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content ">
                <label
                    htmlFor="my-drawer-2"
                    className="btn btn-primary drawer-button lg:hidden"
                ></label>
                {/* Page content here */}
                <Outlet></Outlet>
            </div>
            <div className="drawer-side ">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-teal-600  text-white text-lg">
                    <h2 className="text-center text-sm">Welcome to</h2>
                    <h2 className="text-center text-2xl">House Hunter</h2>
                    <div className="divider "></div>
                    {/* Sidebar content here */}
                    {navOptions}
                    <div className="divider "></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome> Home Page
                        </NavLink>
                    </li>
                    {user && (
                        <li>
                            <button onClick={handleLogout}>
                                <FaSignOutAlt></FaSignOutAlt> Logout
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
