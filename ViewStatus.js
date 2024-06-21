import React,{useState} from 'react'
import axios from 'axios';
import './ViewStatus.css'

function ViewStatus() {
    const [bookingId, setBookingId] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (event) => {
        setBookingId(event.target.value);
    };

    const fetchBookingStatus = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/auth/user/bookingstatus/${bookingId}`);
            setStatus(response.data);
           
        } catch (error) {
            setStatus('');
            setError('Booking not found');
            console.error('Error fetching booking status:', error);
        }
    };
  return (
    <div className='statuschecking-container'>
        <div className='check-status'>
            <h2 id='checkingstatusheading'>Check Booking Status</h2>
                <div className='status-input'>
                   <label>
                    Booking ID:
                   </label>
                   <input
                        type="text"
                        value={bookingId}
                        onChange={handleInputChange}
                        />
                    <br></br>
                    <br></br>
                     <center><button className='statusbutton' onClick={fetchBookingStatus}>Check Status</button></center>
                </div>
                <div className='status-area'>
                 {status && (
                 <div>
                    <h2>Booking Status</h2>
                    <p>{status}</p>
                 </div>
                 )}
                 {error && (
                 <div>
                    <h2>Error</h2>
                    <p>{error}</p>
                 </div>
                 )}
                 </div>
            </div>
    </div>
  )
}

export default ViewStatus