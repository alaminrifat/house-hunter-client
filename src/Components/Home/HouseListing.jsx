import React, { useState, useEffect } from "react";
import Container from "../../Layout/Container/Container";
import HouseCard from "./HouseCard";

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
    useEffect(() => {
        handleSearch();
    }, []);

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
        <Container>
            <div className="flex  items-center justify-center gap-6 ">
                <input
                    type="text"
                    id="cityInput"
                    name="city"
                    className="input input-xs min-w-xs input-accent"
                    placeholder="city"
                    value={filters.city}
                    onChange={handleInputChange}
                />

                <input
                    type="number"
                    id="bedroomsInput"
                    name="bedrooms"
                    className="input input-xs min-w-xs input-accent"
                    placeholder="Bedrooms"
                    value={filters.bedrooms}
                    onChange={handleInputChange}
                />

                <input
                    type="number"
                    id="bathroomsInput"
                    name="bathrooms"
                    className="input input-xs min-w-xs input-accent"
                    placeholder="Bathrooms"
                    value={filters.bathrooms}
                    onChange={handleInputChange}
                />

                {/* Add more filter inputs for roomSize, availability, and rent range */}
                <button
                    className="btn btn-accent btn-xs"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>

            {/* show houses  */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {houses.map((house) => (
                    <HouseCard key={house._id} house={house}></HouseCard>
                ))}
            </div>
        </Container>
    );
};

export default HouseListing;
