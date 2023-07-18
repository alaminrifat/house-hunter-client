import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Auth/AuthProvider";
import { MdOutlineDelete, MdEditDocument } from "react-icons/md";
import { FadeLoader } from "react-spinners";

const ManageHouse = () => {
    const [houses, setHouses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchHouses();
    }, []);

    const fetchHouses = async () => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem("token"); // Get the token from local storage
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                },
            };
            const response = await axios.get(
                `http://localhost:3000/api/houses/${user?.email}`,
                config // Pass the config object with headers
            );
            console.log(response.data.houses);
            setHouses(response.data.houses);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching houses:", error);
        }
    };
    // console.log(houses);
    const deleteHouse = async (houseId) => {
        // console.log(houseId);
        try {
            setIsLoading(true);
            const token = localStorage.getItem("token");
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };

            await axios.delete(
                `http://localhost:3000/api/houses/${houseId}`,
                config
            );
            setHouses((prevHouses) =>
                prevHouses.filter((house) => house._id !== houseId)
            );
            setIsLoading(false);
        } catch (error) {
            console.error("Error deleting house:", error);
        }
    };

    const editHouse = async (houseId, updatedData) => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };

            await axios.put(
                `http://localhost:3000/api/houses/${houseId}`,
                updatedData,
                config
            );
            fetchHouses(); // Refresh the list of houses after updating
        } catch (error) {
            console.error("Error updating house:", error);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Favorite Color</th>
                        <th></th>
                    </tr>
                </thead>
                {isLoading ? (
                    <tbody>
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="ms-[550px] mt-[100px]">
                                    <FadeLoader color="#36d7b7" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                ) : (
                    <tbody>
                        {/* row 1 */}
                        {houses.map((house) => (
                            <tr key={house._id}>
                                <td>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                        />
                                    </label>
                                </td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img
                                                    src="/tailwind-css-component-profile-2@56w.png"
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">
                                                {house.name}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {house.name}
                                    <br />
                                    <span className="badge badge-ghost badge-sm">
                                        Desktop Support Technician
                                    </span>
                                </td>
                                <td>Purple</td>
                                <td className="">
                                    <button className="btn btn-info btn-sm text-white me-2">
                                        <MdEditDocument /> Edit
                                    </button>
                                    <button
                                        className="btn btn-error btn-sm text-white"
                                        onClick={() => deleteHouse(house._id)}
                                    >
                                        <MdOutlineDelete /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>
        </div>
    );
};

export default ManageHouse;
