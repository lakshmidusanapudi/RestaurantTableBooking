import axios from 'axios';
import React, { useState } from 'react';

function UpdateForm({ restaurant, fetchRestaurants, setSelectedRestaurant }) {
    const [formData, setFormData] = useState({
        name: restaurant.name,
        location: restaurant.location,
        tollfreenumber: restaurant.tollfreenumber
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response=await axios.put(`http://localhost:8080/api/auth/restaurant/update/${restaurant.name}`, formData);
            alert(response.data);
            fetchRestaurants();
            setSelectedRestaurant(null);
        } catch (error) {
            console.error('Error in updating restaurant:', error);
        }
    };

    const handleCancel = () => {
        setSelectedRestaurant(null);
    };

    return (
        <div className="updateform">
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='restaurantname-input'>Restaurant Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className='location-input'>Location:</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className='number-input'>Toll-free Number:</label>
                    <input
                        type="text"
                        name="tollfreenumber"
                        value={formData.tollfreenumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className='updatedetailssubmitbutton'>Update</button>
                <button type="button" onClick={handleCancel} className='updatedetailscancelbutton'>Cancel</button>
            </form>
        </div>
    );
}

export default UpdateForm;
