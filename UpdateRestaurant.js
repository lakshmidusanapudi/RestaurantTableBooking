import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UpdateForm from './UpdateForm';
import "./Bookings.css"

function UpdateRestaurant() {
    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/auth/user/viewrestaurants');
            setRestaurants(response.data);
        } catch (error) {
            console.error('Error in fetching restaurants:', error);
        }
    };

    const deleteRestaurant = async (name) => {
        try {
            await axios.delete(`http://localhost:8080/api/auth/restaurent/delete/${name}`);
            fetchRestaurants(); 
        } catch (error) {
            console.error('Error in deleting restaurant:', error);
        }
    };

    const handleUpdateClick = (restaurant) => {
        setSelectedRestaurant(restaurant);
    };

    return (
       
        <div className='updaterestaurants'>
            <h1>Updating Restaurant Details</h1>
            <table>
                <thead>
                    <tr>
                        <th>Restaurant Name</th>
                        <th>Location</th>
                        <th>Toll-free Number</th>
                        <th>Update Action</th>
                        <th>Delete Action</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants.map(restaurant => (
                        <tr key={restaurant.name}>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.location}</td>
                            <td>{restaurant.tollfreenumber}</td>
                            <td>
                                <button onClick={() => handleUpdateClick(restaurant)}>
                                    Update
                                </button>
                            </td>
                            <td>
                                <button onClick={() => deleteRestaurant(restaurant.name)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          
            
        <div className='update-form'>
        
        {selectedRestaurant && (
                <UpdateForm

                    restaurant={selectedRestaurant}
                    fetchRestaurants={fetchRestaurants}
                    setSelectedRestaurant={setSelectedRestaurant}
                />
            )}
       </div>
       
        </div>
    );
}

export default UpdateRestaurant;
