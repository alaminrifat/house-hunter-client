import React, { useState, useEffect } from "react";

const HouseListing = () => {
    const [houses, setHouses] = useState([]);
    const [filters, setFilters] = useState({
        city: "",
        bedrooms: "",
        bathrooms: "",
        roomSize: "",
        availability: "",
        rentMin: "",
        rentMax: "",
    });
    useEffect(() => {try {
        const response =  fetch("http://localhost:3000/api/houses");
        const data =  response.json();
        console.log(data.houses);
        setHouses(data.houses);
    } catch (error) {
        console.error("Error fetching houses:", error);
    } 
    }, []);

    const fetchHouses = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/houses");
            const data = await response.json();
            console.log(data.houses);
            setHouses(data.houses);
        } catch (error) {
            console.error("Error fetching houses:", error);
        }
    };

    const handleSearch = async () => {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await fetch(
                `http://localhost:3000/api/houses?${queryParams}`
            );
            const data = await response.json();
            setHouses(data.houses);
        } catch (error) {
            console.error("Error searching houses:", error);
        }
    };

    const handleInputChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h1 className="text-4xl">House Listings</h1>
            <div>
                <label htmlFor="cityInput">City:</label>
                <input
                    type="text"
                    id="cityInput"
                    name="city"
                    value={filters.city}
                    onChange={handleInputChange}
                />

                <label htmlFor="bedroomsInput">Bedrooms:</label>
                <input
                    type="number"
                    id="bedroomsInput"
                    name="bedrooms"
                    value={filters.bedrooms}
                    onChange={handleInputChange}
                />

                <label htmlFor="bathroomsInput">Bathrooms:</label>
                <input
                    type="number"
                    id="bathroomsInput"
                    name="bathrooms"
                    value={filters.bathrooms}
                    onChange={handleInputChange}
                />

                {/* Add more filter inputs for roomSize, availability, and rent range */}
                <button onClick={handleSearch}>Search</button>
            </div>

            {/* show houses  */}
            {houses.map((house) => (
                <p key={house._id}>{house.name}</p>
            ))}
        </div>
    );
};

export default HouseListing;
