import React, { useState } from 'react'
import axios from 'axios';
import './AddRestaurant.css'

function AddRestaurant() {
  const [formData,setFormData]=useState({
    name:"",
    location:"",
    tollfreenumber:""
  })
  const handleChange=(e)=>{
    const{name,value}=e.target;
    setFormData({
      ...formData,
      [name]:value
    })
  }
  
  
  const registerAPICall = (registerObj) => axios.post("http://localhost:8080/api/auth/admin/addrestaurant", registerObj);
  
  const addRestuarent=()=>{
    
    console.log(formData)
    registerAPICall(formData).then((response) => {
        console.log(response.data);
        alert(response.data);
    }).catch(error => {
        console.error(error);
    })


  }
   
  return (
    <div className='addrestaurent'>   
          <form  className='addrestaurent-form'>
            <h2 id='addrestaurentheading'>Add Restaurant</h2>
            <table>
            <tbody>
            <tr className='addrestaurantname-input'>
                <td><label htmlFor="name" >Restaurant Name: </label></td>
                <td><input type="text"  placeholder=" enter your name" name="name" value={formData.name} onChange={handleChange} /></td>
            </tr>
            <tr className='addrestaurantlocation-input'>
              <td><label htmlFor='location'>Location:</label></td>
              <td><input type='text' placeholder='enter the location' name='location' value={formData.location} onChange={handleChange}/></td>
            </tr>
            <tr className='addrestaurantnumber-input'>
            <td><label htmlFor="tollfreenumber"  >Toll Free Number :</label></td>
            <td><input type="text"  placeholder=" enter your toll-free-number" name="tollfreenumber" value={formData.tollfreenumber} onChange={handleChange} /></td>
            </tr>
            </tbody>
            </table>
            <center><button className="addrestaurentbutton" onClick={addRestuarent}>Add</button></center>
            </form>
        
       
    </div>
   
  )
}
export default AddRestaurant