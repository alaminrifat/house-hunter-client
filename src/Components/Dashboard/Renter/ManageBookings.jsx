import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Container from "../../../Layout/Container/Container";
import { AuthContext } from "../../../Auth/AuthProvider";
import BookingCards from "./BookingCards";
import { ToastContainer, toast } from "react-toastify";

const ManageBookings = () => {
    const { user } = useContext(AuthContext);

    const [bookedHouses, setBookedHouses] = useState([]);
    const [bookingData, setBookingData] = useState({
        name: "",
        email: "", // Automatically filled and cannot be modified
        phone: "",
        houseId: "",
    });

    useEffect(() => {
        // Fetch the list of booked houses for the House Renter
        fetchBookedHouses();
    }, []);

    const fetchBookedHouses = async () => {
        const token = localStorage.getItem("token");
        try {
            const userEmail = user?.email;
            // console.log(userEmail);
            const response = await axios.get(
                `http://localhost:3000/api/renter/bookings/${userEmail}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                setBookedHouses(response.data.bookings);
                // console.log(response.data.bookings);
            }
        } catch (error) {
            console.error("Error fetching booked houses:", error);
        }
    };

    const handleRemoveBooking = async (bookingId) => {
        // console.log(bookingId);
        const token = localStorage.getItem("token");
        try {
            const response = await axios.delete(
                `http://localhost:3000/api/bookings/${bookingId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                // Handle successful removal of booking
                toast.success("Booking Canceled Success!");
                fetchBookedHouses(); // Refresh the list of booked houses
            }
        } catch (error) {
            console.error("Error removing booking:", error);
        }
    };

    return (
        <Container>
            <ToastContainer />

            {/* Booked Houses List */}
            <h3 className="text-4xl text-center font-bold mt-10 ">Your Bookings </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-28 mt-20 ">
                {
                    bookedHouses.length === 0 && <p className="text-accent text-center font-bold"> You have no booking yet!</p>
                }
                {bookedHouses.map((booking) => (
                    <BookingCards
                        key={booking._id}
                        booking={booking}
                        handleRemoveBooking={handleRemoveBooking}
                    ></BookingCards>
                ))}
            </div>
        </Container>
    );
};

export default ManageBookings;
