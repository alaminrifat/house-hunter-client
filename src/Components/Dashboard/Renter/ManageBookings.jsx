import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Container from "../../../Layout/Container/Container";
import { AuthContext } from "../../../Auth/AuthProvider";

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
            console.log(userEmail);
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
                console.log(response.data.bookings);
            }
        } catch (error) {
            console.error("Error fetching booked houses:", error);
        }
    };

    const handleRemoveBooking = async (bookingId) => {
        try {
            const response = await axios.delete(
                `http://localhost:3000/api/bookings/${bookingId}`
            );
            if (response.status === 200) {
                // Handle successful removal of booking
                fetchBookedHouses(); // Refresh the list of booked houses
            }
        } catch (error) {
            console.error("Error removing booking:", error);
        }
    };

    return (
        <Container>
            <h2>House Renter Dashboard</h2>

            {/* Booked Houses List */}
            <h3>Booked Houses</h3>
            <ul>
                {bookedHouses.map((booking) => (
                    <li key={booking.id}>
                        <p>Name: {booking.name}</p>
                        <p>Email: {booking.email}</p>
                        <p>Phone: {booking.phone}</p>
                        <p>House ID: {booking.houseId}</p>
                        <button onClick={() => handleRemoveBooking(booking.id)}>
                            Remove Booking
                        </button>
                    </li>
                ))}
            </ul>
        </Container>
    );
};

export default ManageBookings;
