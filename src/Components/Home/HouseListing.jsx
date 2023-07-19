import React, { useState, useEffect } from "react";
import Container from "../../Layout/Container/Container";
import HouseCard from "./HouseCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { FaSearch } from "react-icons/fa";

import { motion } from "framer-motion";
import { fadeIn } from "../../Utils/animationVariants";

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
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchHouses();
    }, []);

    const fetchHouses = async (page = 1) => {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await fetch(
                `http://localhost:3000/api/houses?page=${page}&${queryParams}`
            );
            const data = await response.json();

            if (page === 1) {
                setHouses(data.houses);
            } else {
                setHouses((prevHouses) => [...prevHouses, ...data.houses]);
            }

            setCurrentPage(page + 1);
            setHasMore(data.houses.length > 0);
        } catch (error) {
            console.error("Error fetching houses:", error);
        }
    };

    const handleSearch = async () => {
        try {
            setHouses([]);
            setCurrentPage(1);
            fetchHouses(1);
        } catch (error) {
            console.error("Error searching houses:", error);
        }
    };

    const handleInputChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <Container>
            <div className="flex  items-center md:justify-center md:gap-6 mt-10 flex-col md:flex-row gap-2">
                <input
                    type="text"
                    id="cityInput"
                    name="city"
                    className="input input-xs md:min-w-xs input-accent  w-28"
                    placeholder="city"
                    value={filters.city}
                    onChange={handleInputChange}
                />

                <input
                    type="number"
                    id="bedroomsInput"
                    name="bedrooms"
                    className="input input-xs min-w-xs input-accent  w-28"
                    placeholder="Bedrooms"
                    value={filters.bedrooms}
                    onChange={handleInputChange}
                />

                <input
                    type="number"
                    id="bathroomsInput"
                    name="bathrooms"
                    className="input input-xs min-w-xs input-accent  w-28"
                    placeholder="Bathrooms"
                    value={filters.bathrooms}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    id="roomSizeInput"
                    name="roomSize"
                    className="input input-xs min-w-xs input-accent  w-28"
                    placeholder="Room Size"
                    value={filters.roomSize}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    id="rentInput"
                    name="rent"
                    className="input input-xs min-w-xs input-accent  w-28"
                    placeholder="Rent"
                    value={filters.rent}
                    onChange={handleInputChange}
                />

                {/* Add more filter inputs for roomSize, availability, and rent range */}
                <button
                    className="btn bg-teal-600 px-5 btn-xs text-xs text-slate-50 hover:bg-teal-800"
                    onClick={handleSearch}
                >
                    <FaSearch></FaSearch> Search
                </button>
            </div>

            {/* show houses  */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {houses.map((house) => (
                    <HouseCard key={house._id} house={house}></HouseCard>
                ))}
            </div>
            <InfiniteScroll
                dataLength={houses.length}
                next={() => fetchHouses(currentPage)}
                hasMore={hasMore}
                loader={
                    <h4 className="my-8 text-center text-2xl font-bold">
                        Loading...
                    </h4>
                }
                // endMessage={<p>No more houses to display</p>}
            ></InfiniteScroll>
        </Container>
    );
};

export default HouseListing;
