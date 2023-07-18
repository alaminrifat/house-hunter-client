import { Link, NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const navOptions = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "navbar-active" : "navbar-not-active"
                    }
                >
                    <FaHome />
                    <span>Home</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="dashboard"
                    className={({ isActive }) =>
                        isActive ? "navbar-active" : "navbar-not-active"
                    }
                >
                    <FaHome />
                    <span>Dashboard</span>
                </NavLink>
            </li>
        </>
    );
    return (
        <div className="container mx-auto">
            <div className="navbar bg-indigo-50 rounded-xl">
                <div className="navbar-start ">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            {navOptions}
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost normal-case text-xl">
                        daisyUI
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">{navOptions}</ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <>
                            <p>{user.role}</p>
                            <button
                                className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                                // onClick={logout}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="login">
                            <button className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow">
                                Login
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
