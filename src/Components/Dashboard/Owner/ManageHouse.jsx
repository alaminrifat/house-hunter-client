import axios from "axios";
import React, { useEffect, useState } from "react";

const ManageHouse = () => {
    const [houses, setHouses] = useState([]);

    useEffect(() => {
        fetchHouses();
    }, []);

    const fetchHouses = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/houses/${user.email}`
            );
            setHouses(response.data);
        } catch (error) {
            console.error("Error fetching houses:", error);
        }
    };

    const deleteHouse = async (houseId) => {
        try {
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
                <tbody>
                    {/* row 1 */}
                    {houses.map((house) => {
                        <tr key={house._id}>
                            <th>
                                <label>
                                    <input
                                        type="checkbox"
                                        className="checkbox"
                                    />
                                </label>
                            </th>
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
                                            Hart Hagerty
                                        </div>
                                        
                                    </div>
                                </div>
                            </td>
                            <td>
                                Zemlak, Daniel and Leannon
                                <br />
                                <span className="badge badge-ghost badge-sm">
                                    Desktop Support Technician
                                </span>
                            </td>
                            <td>Purple</td>
                            <th>
                                <button className="btn btn-ghost btn-xs">
                                    details
                                </button>
                            </th>
                        </tr>;
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ManageHouse;
