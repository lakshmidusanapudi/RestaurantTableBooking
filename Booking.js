import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ViewStatus.css';

function Booking() {
  const { restaurantname } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    restaurantname: restaurantname || "",
    mobilenumber: "",
    date: "",
    time: "",
    tableno: "",
    seats: 0
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      restaurantname: restaurantname
    }));
  }, [restaurantname]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const baseurl = "http://localhost:8080/api/auth";

  const registerAPICall = (formData) => axios.post(baseurl + '/user/booking', formData);

  const booking = (e) => {
    e.preventDefault(); 
    registerAPICall(formData)
      .then((response) => {
        console.log(response.data); 
        alert(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className='booking-container'>
      <form className='booking-form' onSubmit={booking}>
        <h2 id='bookingformheading'>Restaurant Booking Form</h2>
        <table>
          <tr className='restaurant-name-input'>
            <td><label htmlFor='name'>Name</label></td>
            <td><input type='text' placeholder='Enter your name' name='name' value={formData.name} onChange={handleChange} /></td>
          </tr>
          <tr className='restaurant-name-input'>
            <td><label htmlFor='email'>Email</label></td>
            <td><input type='email' placeholder='Enter your email' name='email' value={formData.email} onChange={handleChange} /></td>
          </tr>
          <tr className='restaurant-restaurantname-input'>
            <td><label htmlFor='restaurantname'>Restaurant Name</label></td>
            <td><input type='text' name='restaurantname' value={formData.restaurantname} onChange={handleChange} readOnly /></td>
          </tr>
          <tr className='mobilenumber-input'>
            <td><label htmlFor='mobilenumber'>Mobile Number</label></td>
            <td><input type='text' placeholder='Enter your mobile number' name='mobilenumber' value={formData.mobilenumber} onChange={handleChange} /></td>
          </tr>
          <tr className='date-input'>
            <td><label htmlFor='date'>Date</label></td>
            <td><input type='date' name='date' value={formData.date} onChange={handleChange} /></td>
          </tr>
          <tr className='time-input'>
            <td><label htmlFor='time'>Time</label></td>
            <td><input type='time' name='time' value={formData.time} onChange={handleChange} /></td>
          </tr>
          <tr className='tableno-input'>
            <td><label htmlFor='tableno'>Table No</label></td>
            <td><input type='text' placeholder='Enter the table number' name='tableno' value={formData.tableno} onChange={handleChange} /></td>
          </tr>
          <tr className='seats-input'>
            <td><label htmlFor='seats'>Seats</label></td>
            <td><input type='number' placeholder='Enter the number of seats' name='seats' value={formData.seats} onChange={handleChange} /></td>
          </tr>
        </table>
        <center>
          <button className='bookingbutton' type='submit'>Book</button>
        </center>
      </form>
    </div>
  );
}

export default Booking;
