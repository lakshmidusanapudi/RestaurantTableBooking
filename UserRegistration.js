import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios";
import './UserRegistration.css'

function UserRegistration() {
  const [formData, setFormData] = useState({
    email: "",
    address:"",
    mobilenumber:"",
    name: "",
    password: "",
    image:null
});

const navigate=useNavigate();

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
};

const handleFileChange = (e) => {
  const { name, files } = e.target;
  setFormData({
    ...formData,
    [name]: files[0],
    });
  };
  const baseurl = "http://localhost:8080/api/auth"
  
  const registerAPICall = (registerObj) => axios.post(baseurl + '/userregister', registerObj);
  
  const Userregister=(e)=>{
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('email', formData.email);
    formDataToSend.append('name', formData.name);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('mobilenumber', formData.mobilenumber);
    formDataToSend.append('address', formData.address);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    registerAPICall(formDataToSend).then((response) => {
      console.log(response.data);
      alert(response.data);
      if(response.data==="Successfully Registered")
        {
          navigate("/userlogin")
        }
    }).catch(error => {
      console.error(error);
    })
  }

  return (
    <div className='user-registration-form'>
    
            <form className='regd-form' onSubmit={Userregister}>
            <h2 id='userregister'>Register</h2>
              <table>
                <tbody>
                  <tr className='register-email-input'>
                       <td><label htmlFor="email" >Email </label></td>
                       <td><input type="text"  placeholder=" enter your email" name="email" value={formData.email} onChange={handleChange} /></td>
                  </tr>
                  <tr className='register-name-input'>
                      <td><label htmlFor="name"  >User name</label></td>
                      <td><input type="text"  placeholder=" enter your username" name="name" value={formData.name} onChange={handleChange} /></td>
                  </tr>
                  <tr className='register-image-input'>
                    <td><label htmlFor="image" required="required">ProfileImage</label></td>
                    <td><input type="file" name="image" onChange={handleFileChange} /></td>
                  </tr>
                  <tr className='register-address-input'>
                      <td><label htmlFor="address"  >Address </label></td>
                      <td><input type="text"  placeholder=" enter your address" name="address" value={formData.address} onChange={handleChange} /></td>
                  </tr>
                  <tr className='register-mobilenumber-input'>
                       <td><label htmlFor="mobilenumber"  >Mobile Number </label></td>
                       <td><input type="text"  placeholder=" enter your mobile number" name="mobilenumber" value={formData.mobilenumber} onChange={handleChange} /></td>
                  </tr>
                
                  <tr className='register-password-input'>
                      <td><label htmlFor="password" >Password</label></td>
                      <td><input type="password"  placeholder=" enter your user password" name="password" value={formData.password} onChange={handleChange} /></td>
                  </tr>
                  </tbody> 
                </table>
                <center><button className="register-button" type='submit'>Register</button></center>
                <p>Already have an account? <Link to='/userlogin'>Login here</Link></p>
             </form>
             
    </div>
    
  )
}

export default UserRegistration