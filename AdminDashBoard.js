import React from 'react'
import {Link} from 'react-router-dom'
function AdminDashBoard() {
  return (
    <div>
     <nav className="navbar">
        <div className="navbar-left">
          <Link to='/admindashboard' className="nav-item">AdminDashBoard</Link>
        </div>
        <div className="navbar-right">
        <button className="nav-item">
            <Link to='/addrestaurent' className="nav-item">AddRestaurants</Link>
        </button>
        <button className="nav-item">
            <Link to="/bookingapproval" >Booking Approval</Link>
        </button>
        <button className="nav-item">
            <Link to="/update" >UpdateRestaurant</Link>
        </button>
        <button className="nav-item">
            <Link to="/viewall" >ViewAllCustomers</Link>
        </button>
        <button className="nav-item">
          <Link to="/">Logout</Link>
        </button>
        </div>
      </nav>
      <img src='https://as1.ftcdn.net/v2/jpg/03/24/73/92/1000_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg' alt='homeimage'/>
    </div>
  )
}

export default AdminDashBoard