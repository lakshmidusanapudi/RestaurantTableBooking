import React from 'react'
import { useState,useEffect } from 'react';
import './VieewAll.css';
import axios from 'axios';

function ViewAllCustomers() {
    const [users, setUsers] = useState([]);
 
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/auth/allusers');
          setUsers(response.data);
        } catch (err) {
          console.log(err)
        } 
      };
  
      fetchUsers();
    }, []);
  
   
  
    return (
      <div>
        <h1>All Users</h1>
        <div className='userContainer'>
          {users.map((user) => (
            <div key={user.email} className='userCard'>
              <img
                src={`data:image/jpeg;base64,${user.image}`}
                alt={`${user.name}'s profile`}
                className='userImage'
              />
              <div className='userInfo'>
                <h2>{user.name}</h2>
                <p>Email: {user.email}</p>
                <p>Mobile: {user.mobilenumber}</p>
                <p>Address: {user.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  

export default ViewAllCustomers