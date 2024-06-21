import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Bookings.css';


function BookingApprovals() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/auth/admin/allbookings');
            setBookings(response.data);
        } catch (error) {
            console.error('Error in fetching bookings:', error);
            setError('Failed to fetch bookings.');
        } finally {
            setLoading(false);
        }
    };

    const handleApproval = async (id) => {
        try {
            setLoading(true);
            await axios.put(`http://localhost:8080/api/auth/admin/statusupdate/${id}`);
            fetchBookings();
        } catch (error) {
            console.error('Error in approving booking:', error);
            setError('Failed to approve booking.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (id) => {
        try {
            setLoading(true);
            await axios.put(`http://localhost:8080/api/auth/admin/statusupdate/cancel/${id}`);
            fetchBookings();
        } catch (error) {
            console.error('Error in cancelling booking:', error);
            setError('Failed to cancel booking.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id='bookings'>
            <h1>Bookings</h1>
            {error && <div className="error">{error}</div>}
            {loading ? (
                <div>Loading...</div>
            ) : (
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
                            <th>Action</th>
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
                                <td>
                                    {booking.status !== 'Approved' && (
                                        <button onClick={() => handleApproval(booking.id)}>Approve</button>
                                    )}
                                    {booking.status === 'Approved' && (
                                        <button onClick={() => handleCancel(booking.id)}>Cancel</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default BookingApprovals;
