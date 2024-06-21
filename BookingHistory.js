import React,{useContext,useState,useEffect} from 'react'
import axios from 'axios';
import { mailcontext } from '../App';

function BookingHistory() {
    const [bookings, setBookings] = useState([]);
    const [mail, setMail] = useContext(mailcontext);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            console.log(mail);
           
            const response = await axios.get(`http://localhost:8080/api/auth/user/allbookingsby/${mail}`); 
            console.log(response.data);
            setBookings(response.data);
        } catch (error) {
            console.error('Error in fetching bookings:', error);
        }
    };
  return (
    <div id='bookings'>

    <h1>Bookings</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Date</th>
                <th>Time</th>
                <th>Table No</th>
                <th>Seats</th>
                <th>Status</th>
               
            </tr>
        </thead>
        <tbody>
            {bookings.map(booking => (
                <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.name}</td>
                    <td>{booking.email}</td>
                    <td>{booking.mobilenumber}</td>
                    <td>{booking.date}</td>
                    <td>{booking.time}</td>
                    <td>{booking.tableno}</td>
                    <td>{booking.seats}</td>
                    <td>{booking.status}</td>
                   
                </tr>
            ))}
        </tbody>
    </table>
</div>
  )
}

export default BookingHistory