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
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered me-6 mb-4 w-full"
            />
            <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="input input-bordered me-6 mb-4 w-full"
            />
            <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="input input-bordered me-6 mb-4 w-full"
            />
            <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className="input input-bordered me-6 mb-4 w-full"
            />
            <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className="input input-bordered me-6 mb-4 w-full"
            />
            {/* TODO: add other fields with customize the view */}
            {/* Add other input fields for editing the house details */}
            <button type="submit" className="btn btn-info">
                Update
            </button>
        </form>
    );
};

export default EditHouseForm;
