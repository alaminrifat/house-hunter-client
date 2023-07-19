import React, { useState } from "react";

const EditHouseForm = ({ house, onSubmit }) => {
    const [formData, setFormData] = useState(house);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered me-6 mb-4 w-full"
            />
            <label htmlFor="address">Address</label>
            <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="input input-bordered me-6 mb-4 w-full"
            />
            <label htmlFor="city">City</label>
            <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="input input-bordered me-6 mb-4 w-full"
            />
            <label htmlFor="bedrooms">Bedroom</label>
            <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className="input input-bordered me-6 mb-4 w-full"
            />
            <label htmlFor="bathrooms">Bathroom</label>
            <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className="input input-bordered me-6 mb-4 w-full"
            />
            <label htmlFor="rentPerMonth">Rent</label>
            <input
                type="number"
                name="rentPerMonth"
                value={formData.rentPerMonth}
                onChange={handleChange}
                className="input input-bordered me-6 mb-4 w-full"
            />
            {/* TODO: add other fields with customize the view */}
            {/* Add other input fields for editing the house details */}
            <button type="submit" className="btn bg-teal-600 hover:bg-teal-800 w-full text-white">
                Update
            </button>
        </form>
    );
};

export default EditHouseForm;
