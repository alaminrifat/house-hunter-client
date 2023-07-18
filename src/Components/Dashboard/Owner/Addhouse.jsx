import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import Container from "../../../Layout/Container/Container";

const Addhouse = () => {
    const { register, handleSubmit, reset } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const onSubmit = async (data) => {
        setIsLoading(true);
        setError("");
        setSuccessMessage("");

        // console.log(data);
        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:3000/api/houses",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                setSuccessMessage("House added successfully");
                reset();
            }
        } catch (error) {
            setError("Error adding house. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="mt-10">
            <Container>
                {isLoading && <p>Loading...</p>}
                {/* {error && <p className="error">{error}</p>} */}
                {successMessage && <p className="success">{successMessage}</p>}
                <div className=" flex justify-center">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="card flex-shrink-0 w-full max-w-3xl shadow-2xl bg-base-100 py-6 px-12"
                    >
                        <div className="card-body">
                            <div className="form-control">
                                <h2 className="font-bold text-xl text-center mb-6 underline-offset-8">
                                    Add New House
                                </h2>
                                <input
                                    type="text"
                                    name="name"
                                    className="input input-bordered me-6 mb-4 w-full"
                                    placeholder="Name"
                                    {...register("name", { required: true })}
                                />
                                <div className="flex justify-start">
                                    <input
                                        type="text"
                                        name="address"
                                        className="input input-bordered me-6 mb-4 w-full"
                                        placeholder="Address"
                                        {...register("address", {
                                            required: true,
                                        })}
                                    />

                                    <input
                                        type="text"
                                        name="city"
                                        className="input input-bordered ms-4 "
                                        placeholder="City"
                                        {...register("city", {
                                            required: true,
                                        })}
                                    />
                                </div>

                                <div className="flex ">
                                    <input
                                        type="number"
                                        name="bedrooms"
                                        className="input input-bordered me-6 mb-4 w-full"
                                        placeholder="Bedrooms"
                                        {...register("bedrooms", {
                                            required: true,
                                        })}
                                    />

                                    <input
                                        type="number"
                                        name="bathrooms"
                                        className="input input-bordered me-6 mb-4 w-full"
                                        placeholder="Bathrooms"
                                        {...register("bathrooms", {
                                            required: true,
                                        })}
                                    />

                                    <input
                                        type="number"
                                        name="roomSize"
                                        className="input input-bordered mb-4 w-full"
                                        placeholder="Room Size"
                                        {...register("roomSize", {
                                            required: true,
                                        })}
                                    />
                                </div>

                                <input
                                    type="text"
                                    name="picture"
                                    className="input input-bordered mb-4 w-full"
                                    placeholder="Picture URL"
                                    {...register("picture", { required: true })}
                                />

                                <input
                                    type="date"
                                    name="availabilityDate"
                                    className="input input-bordered mb-4 w-full"
                                    placeholder="Available Date"
                                    {...register("availabilityDate", {
                                        required: true,
                                    })}
                                />

                                <input
                                    type="number"
                                    name="rentPerMonth"
                                    className="input input-bordered mb-4 w-full"
                                    placeholder="Rent Per Month"
                                    {...register("rentPerMonth", {
                                        required: true,
                                    })}
                                />

                                <div className="flex">
                                <input
                                    type="email"
                                    name="email"
                                    className="input input-bordered mb-4 w-full me-6"
                                    placeholder="Email"
                                    {...register("email", {
                                        required: true,
                                    })}
                                />
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    className="input input-bordered mb-4 w-full"
                                    placeholder="Phone Number"
                                    {...register("phoneNumber", {
                                        required: true,
                                    })}
                                />
                                </div>

                                <textarea
                                    name="description"
                                    className="textarea textarea-bordered mb-4 w-full"
                                    placeholder="Description"
                                    {...register("description", {
                                        required: true,
                                    })}
                                />

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="btn bg-teal-600 text-white my-4"
                                >
                                    Add House
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default Addhouse;
