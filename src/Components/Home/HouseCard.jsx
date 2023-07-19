import React, { useContext } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { ToastContainer, toast } from "react-toastify";

const HouseCard = ({ house }) => {
    const { user, fullName } = useContext(AuthContext);
    const {
        name,
        rentPerMonth,
        address,
        city,
        roomSize,
        bedrooms,
        bathrooms,
        _id,
    } = house;

    const handleBooking = async (id) => {
        const token = localStorage.getItem("token");
        console.log(id);
        if (user?.role === "House Owner") {
            toast.error("Only House renter can book house");

            return;
        } else {
            try {
                const bookingData = {
                    name: user.fullName,
                    email: user.email,
                    houseId: id,
                };
                console.log(bookingData);
                const response = await fetch(
                    "http://localhost:3000/api/bookings",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(bookingData),
                    }
                );

                if (response.ok) {
                    toast.success("Booking created successfully");
                } else {
                    const data = await response.json();
                    toast.error(data.error);
                }
            } catch (error) {
                console.error("Error creating booking:", error);
                toast.error("An error occurred. Please try again.");
            }
        }
    };
    return (
        <div>
            <ToastContainer />
            <a
                href="#"
                className="block rounded-lg p-4 shadow-lg shadow-indigo-100"
            >
                <img
                    alt="Home"
                    src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    className="h-56 w-full rounded-md object-cover"
                />

                <div className="mt-2">
                    <dl>
                        <p className="text-md mb-2">Owner: {name}</p>
                        <div>
                            <dt className="sr-only">Price</dt>

                            <p className="text-sm">
                                {" "}
                                <span className="text-gray-500">
                                    Rent Per Month:
                                </span>{" "}
                                <span className="text-teal-600">
                                    ${rentPerMonth}
                                </span>{" "}
                            </p>
                        </div>

                        <div>
                            <dt className="sr-only">Address</dt>

                            <dd className="font-medium">
                                {`${address}, ${city}`}
                            </dd>
                        </div>
                    </dl>

                    <div className="mt-6 flex items-center gap-8 text-xs">
                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <svg
                                className="h-4 w-4 text-indigo-700"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                                />
                            </svg>

                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500">Room Size</p>

                                <p className="font-medium"> {roomSize}x sf</p>
                            </div>
                        </div>

                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <svg
                                className="h-4 w-4 text-indigo-700"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                />
                            </svg>

                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500">Bathroom</p>

                                <p className="font-medium">
                                    {" "}
                                    {bathrooms} rooms{" "}
                                </p>
                            </div>
                        </div>

                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <svg
                                className="h-4 w-4 text-indigo-700"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                />
                            </svg>

                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500">Bedroom</p>

                                <p className="font-medium">{bedrooms} rooms </p>
                            </div>
                        </div>
                        <div>
                            <button
                                onClick={() => handleBooking(_id)}
                                className="btn btn-sm p-2 bg-teal-500 text-white hover:bg-teal-700"
                            >
                                Book
                            </button>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default HouseCard;
