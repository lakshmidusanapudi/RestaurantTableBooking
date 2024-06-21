import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './UserLogin.css';
import { mailcontext, usercontext } from '../App';


function UserLogin() {
 const [mail,setMail]=useContext(mailcontext);
 const [userLoggedin,setuserLoogedIn]=useContext(usercontext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const baseurl = 'http://localhost:8080/api/auth';

  const loginAPICall = (loginObj) => axios.post(baseurl + '/userlogin', loginObj);

  const login = (e) => {
    e.preventDefault(); 
    console.log(formData);
    loginAPICall(formData)
      .then((response) => {
        console.log(response.data);
        alert(response.data);
        if (response.data === 'Login Successful') {
          setMail(formData.email);
          setuserLoogedIn(true);
          navigate('/userdashboard');
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="user-login-container">
      <form className='user-login-form' onSubmit={login}>
        <h2>User Login Form</h2>
        <table>
          <tbody>
            <tr className='email-input'>
              <td><label htmlFor='email'>Email:</label></td>
              <td><input type='text' placeholder='enter your email' name="email" value={formData.email} onChange={handleChange} /></td>
            </tr>
            <tr className='input-password'>
              <td><label htmlFor='password'>Password:</label></td>
              <td><input type='password' placeholder='enter your password' name="password" value={formData.password} onChange={handleChange} /></td>
            </tr>
          </tbody>
        </table>
        <p>Don't have an account? <Link to='/userregister'>Register here</Link></p>
        <center><button className="userloginbutton" type="submit">Login</button></center>
      </form>
    </div>
  );
}

export default UserLogin;
