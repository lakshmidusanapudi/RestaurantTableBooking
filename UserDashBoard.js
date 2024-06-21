import React from 'react'
import { Link } from 'react-router-dom'
function UserDashBoard() {
  const logout=()=>{
    alert("logged out successfully")
  }
  return (
    <div>
    <nav className="navbar">
        <div className="navbar-left">
          <Link to='/userdashboard' className="nav-item">UserDashBoard</Link>
        </div>
        
        <div className="navbar-right">
        <button>
          <Link to='/userprofile' className="nav-item">UserProfile</Link>
        </button>
        <button className="nav-item">
           <Link to='/viewrestaurents' className="nav-item">ViewRestaurents</Link>
        </button>
        <button className="nav-item">
            <Link to="/viewhistory" >View Booking History</Link>
        </button>
        <button className="nav-item">
            <Link to="/viewstatus" >View Booking Status</Link>
        </button>
        <button className='nav-item' onClick={logout}>
          <Link to="/" >Logout</Link>
        </button>
        </div>
      </nav>
      <img src='https://as1.ftcdn.net/v2/jpg/03/24/73/92/1000_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg' alt='homeimage'/>
        </div>
  )
}

export default UserDashBoard