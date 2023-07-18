import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageBookings = () => {
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
        try {
            // TODO: replace user.email from authcontext
            const userEmail = "tch@tch.com"; // Replace with the actual user email
            const response = await axios.get(
                `http://localhost:3000/api/bookings?email=${userEmail}`
            );
            if (response.status === 200) {
                setBookedHouses(response.data);
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
        <div>
            <h2>House Renter Dashboard</h2>

            {/* Booking Form
            <form onSubmit={handleBooking}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={bookingData.name}
                        onChange={(e) =>
                            setBookingData({
                                ...bookingData,
                                name: e.target.value,
                            })
                        }
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        value={bookingData.email}
                        onChange={(e) =>
                            setBookingData({
                                ...bookingData,
                                email: e.target.value,
                            })
                        }
                        disabled
                        required
                    />
                </label>
                <label>
                    Phone:
                    <input
                        type="text"
                        value={bookingData.phone}
                        onChange={(e) =>
                            setBookingData({
                                ...bookingData,
                                phone: e.target.value,
                            })
                        }
                        required
                    />
                </label>
                <label>
                    House ID:
                    <input
                        type="text"
                        value={bookingData.houseId}
                        onChange={(e) =>
                            setBookingData({
                                ...bookingData,
                                houseId: e.target.value,
                            })
                        }
                        required
                    />
                </label>
                <button type="submit">Book Now</button>
            </form> */}

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
        </div>
    );
};

export default ManageBookings;
