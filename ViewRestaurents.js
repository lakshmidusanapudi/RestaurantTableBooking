import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Restaurents.css';

function ViewRestaurents() {
  const [restaurents, SetRestaurents] = useState([]);

  useEffect(() => {
    fetchRestaurents();
  }, []);

  const fetchRestaurents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/auth/user/viewrestaurants');
      SetRestaurents(response.data);
    } catch (error) {
      console.error('Error in fetching bookings:', error);
    }
  };

  return (
    <div id='restaurents'>
      <h1>ViewRestaurents</h1>
      <table>
        <thead>
          <tr>
            <th>Restaurent Name</th>
            <th>Location</th>
            <th>Tollfree Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {restaurents.map(restaurent => (
            <tr key={restaurent.name}>
              <td>{restaurent.name}</td>
              <td>{restaurent.location}</td>
              <td>{restaurent.tollfreenumber}</td>
              <td>
                <button>
                  <Link to={`/booking/${restaurent.name}`}>Book</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewRestaurents;
