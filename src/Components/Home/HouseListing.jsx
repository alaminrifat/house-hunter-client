import React, { useState, useEffect } from "react";
import Container from "../../Layout/Container/Container";
import HouseCard from "./HouseCard";
import InfiniteScroll from "react-infinite-scroll-component";

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
            <div className="flex  items-center justify-center gap-6 mt-10">
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
                <input
                    type="number"
                    id="roomSizeInput"
                    name="roomSize"
                    className="input input-xs min-w-xs input-accent"
                    placeholder="Room Size"
                    value={filters.roomSize}
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
            <InfiniteScroll
                dataLength={houses.length}
                next={() => fetchHouses(currentPage)}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                // endMessage={<p>No more houses to display</p>}
            >
               
            </InfiniteScroll>
        </Container>
    );
};

export default HouseListing;
