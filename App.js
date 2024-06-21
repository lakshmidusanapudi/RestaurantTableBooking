import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AdminLogin from './HomeComponent/AdminLogin';
import Home from './HomeComponent/Home'
import UserLogin from './HomeComponent/UserLogin';
import UserRegistration from './HomeComponent/UserRegistration';
import AdminDashBoard from './AdminComponent/AdminDashBoard';
import UserDashBoard from './UserComponent/UserDashBoard';
import AddRestaurant from './AdminComponent/AddRestaurant';
import BookingApprovals from './AdminComponent/BookingApprovals';
import Booking from './UserComponent/Booking';
import ViewRestaurents from './UserComponent/ViewRestaurents';
import ViewStatus from './UserComponent/ViewStatus';
import UserProfile from './UserComponent/UserProfile';
import { useState, createContext } from 'react';

import UpdateRestaurant from './AdminComponent/UpdateRestaurant';
import BookingHistory from './UserComponent/BookingHistory';
import ViewAllCustomers from './AdminComponent/ViewAllCustomers';

export const mailcontext = createContext() 
export const usercontext=createContext()
export const admincontext=createContext()
function App() {
  const [mail, setMail] = useState("");
  const [userLoggedIn,setuserLoggedIn]=useState(false);
  const [adminLoggedIn,setadminLoggedIn]=useState(false);
  return (
    <mailcontext.Provider value={[mail,setMail]}>
    <usercontext.Provider value={[userLoggedIn,setuserLoggedIn]}>
    <admincontext.Provider value={[adminLoggedIn,setadminLoggedIn]}>
    <BrowserRouter>
     {/* <Home/> */}
    
        <Routes>
           <Route path='/' element={<Home/>}/>
           <Route path='/adminlogin' element={<AdminLogin/>}/>
           <Route path='/userlogin' element={<UserLogin/>}/>
           <Route path='/userregister' element={<UserRegistration/>}/>
           <Route path='*' element={<p>404 error</p>}/>
           {userLoggedIn &&(
            <>
            <Route path='/userdashboard' element={<UserDashBoard/>}/>
            <Route path="/booking/:restaurantname" element={<Booking />} />
            <Route path='/viewrestaurents' element={<ViewRestaurents/>}/>
            <Route path='/viewstatus' element={<ViewStatus/>}/>
            <Route path='/userprofile' element={<UserProfile/>}/>
            <Route path='/viewhistory' element={<BookingHistory/>}/>
            </>
           )
           }
           {
            adminLoggedIn && (
              <>
              <Route path='/admindashboard' element={<AdminDashBoard/>}/>
              <Route path='/addrestaurent' element={<AddRestaurant/>}/>
              <Route path='/bookingapproval' element={<BookingApprovals/>}/> 
              <Route path='/update' element={<UpdateRestaurant/>}/>
              <Route path='/viewall' element={<ViewAllCustomers/>}/>
              </>
            )
           }
           
        </Routes>
     </BrowserRouter>
     </admincontext.Provider>
    </usercontext.Provider>
    </mailcontext.Provider>
  );
}

export default App;
