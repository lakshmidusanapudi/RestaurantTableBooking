import React ,{useState} from 'react'
import './HomeStyles.css'
import {Link} from 'react-router-dom'

function Home() {
    const [userDropdownVisible, setUserDropdownVisible] = useState(false);

    const UserDropdown = () => {
      setUserDropdownVisible(!userDropdownVisible);
    };
  
    return (
      <div>
      <nav className="navbar">
        <div className="navbar-left">
         <Link to='/' className="nav-item">Home</Link>
        </div>
        <div className="navbar-right">
          <div className="dropdown">
            <button className="dropbtn" onClick={UserDropdown}>
              User
            </button>
            {
            userDropdownVisible && (
              <div className="dropdown-content">
               <Link to='/userlogin'className='link'>Login</Link>
               <Link to='/userregister'className='link'>Register</Link>
              </div>
            )}
          </div>
          <button className="nav-item">
            <Link to="/adminlogin" >Admin</Link>
          </button>
        </div>
      </nav>

      <img src='https://as1.ftcdn.net/v2/jpg/03/24/73/92/1000_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg' alt='homeimage'/>
      </div>
    );
  };
  
  


export default Home
