import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Auth/AuthProvider";
import { MdOutlineDelete, MdEditDocument } from "react-icons/md";
import { FadeLoader } from "react-spinners";
import EditHouseForm from "./EditHouseForm";
import { useForm } from "react-hook-form";

const ManageHouse = () => {
    const [houses, setHouses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedHouse, setSelectedHouse] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchHouses();
    }, []);

    useEffect(() => {
        if (feedbackModalOpen) {
            window.my_modal_5.showModal();
        }
    }, [feedbackModalOpen]);

    const handleSendFeedback = (id) => {
        setSelectedHouse(id);
        setFeedbackModalOpen(true);
    };

    const fetchHouses = async () => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem("token");
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const response = await axios.get(
                `http://localhost:3000/api/houses/${user?.email}`,
                config
            );
            setHouses(response.data.houses);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching houses:", error);
        }
    };

    const deleteHouse = async (houseId) => {
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

    const updateHouse = async (houseId, updatedData) => {
        try {
            setIsLoading(true);
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
            setIsEditing(false);
            setFeedbackModalOpen(false);
        } catch (error) {
            console.error("Error updating house:", error);
        }
    };

    const openEditForm = (house) => {
        setSelectedHouse(house);
        setIsEditing(true);
        setFeedbackModalOpen(true);
    };

    const closeEditForm = () => {
        setSelectedHouse(null);
        setIsEditing(false);
        setFeedbackModalOpen(false);
    };
    console.log(houses);
    return (
        <div className="overflow-x-auto">
            {houses.length == 0 ? (
                <p>You have not added any house yet!</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Owner</th>
                            <th>Address</th>
                            <th>Size</th>
                            <th>Bedrooms</th>
                            <th>Bathrooms</th>
                            <th>Rent</th>
                            <th>Action</th>
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
                            {houses.map((house) => (
                                <tr key={house._id}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img
                                                        src={house.picture}
                                                        alt="Avatar Tailwind CSS Component"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-sm">
                                                    {house.name}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {house.address}
                                        <br />
                                        <span className="badge badge-ghost mt-1">
                                            {house.city}
                                        </span>
                                    </td>
                                    <td>{house.roomSize} </td>
                                    <td>{house.bedrooms} </td>
                                    <td>{house.bathrooms} </td>
                                    <td>{house.rentPerMonth} </td>
                                    
                                    <td className="">
                                        <button
                                            className="btn btn-info btn-sm text-white me-2"
                                            onClick={() => openEditForm(house)}
                                        >
                                            <MdEditDocument /> Edit
                                        </button>
                                        <button
                                            className="btn btn-error btn-sm text-white"
                                            onClick={() =>
                                                deleteHouse(house._id)
                                            }
                                        >
                                            <MdOutlineDelete /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            )}

            {isEditing && selectedHouse && (
                <dialog
                    id="my_modal_5"
                    className="modal modal-bottom sm:modal-middle"
                >
                    <div className="card flex-shrink-0 w-full max-w-3xl shadow-2xl bg-base-100 py-6 px-12">
                        <div className="card-body">
                            <h2 className="font-bold text-xl text-center mb-6 underline-offset-8">
                                Edit House
                            </h2>
                            <EditHouseForm
                                house={selectedHouse}
                                onSubmit={(updatedData) =>
                                    updateHouse(selectedHouse._id, updatedData)
                                }
                                onCancel={closeEditForm}
                            />
                            <button className="btn" onClick={closeEditForm}>
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default ManageHouse;
