import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';
import { admincontext } from '../App';

function AdminLogin() {
  const [adminLoggedIn,setadminLoggedIn]=useContext(admincontext)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const baseurl = "http://localhost:8080/api/auth";
  
  const AdminloginAPICall = (loginObj) => axios.post(baseurl + '/admin/login', loginObj);
  
  const login = (e) => {
    e.preventDefault();
    console.log(formData);
    AdminloginAPICall(formData).then((response) => {
      console.log(response.data);
      alert(response.data);
      if (response.data === "Login Successful") {
        setadminLoggedIn(true);
        console.log("true");
        navigate("/admindashboard");
      }
    }).catch(error => console.error(error));
  };

  return (
    <div className='admin-login-container'>
      <form className='admin-login-form' onSubmit={login}>
        <h2 id='adminlogin'>Admin Login Form</h2>
        <table>
          <tbody>
            <tr className='admin-email-input'>
              <td><label htmlFor='email'>Email:</label></td>
              <td><input type='email' placeholder='enter email' name='email' value={formData.email} onChange={handleChange} /></td>
            </tr>
        
            <tr className='admin-password-input'>
              <td><label htmlFor='password'>Password:</label></td>
              <td><input type='password' placeholder='enter password' name='password' value={formData.password} onChange={handleChange} /></td>
            </tr>
          </tbody>
        </table>
        <center><button className='adminloginbutton' type='submit'>Login</button></center>
      </form>
    </div>
  );
}

export default AdminLogin;
