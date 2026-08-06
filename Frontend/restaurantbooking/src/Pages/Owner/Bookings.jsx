import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { OWNER_MENU } from "../../config/menus";
import { getOwnerBookings } from "../../api/apis";
import { toast } from "react-toastify";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getOwnerBookings();
      setBookings(data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout
        brandLabel="Tavola for Restaurants"
        roleTag="Restaurant Owner"
        menu={OWNER_MENU}
      >
        <h3>Loading...</h3>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      brandLabel="Tavola for Restaurants"
      roleTag="Restaurant Owner"
      menu={OWNER_MENU}
    >
      <div className="dash-topbar">
        <div>
          <h1>Bookings</h1>
          <p>Reservations for your restaurant.</p>
        </div>
      </div>

      <div className="panel">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Table</th>
              <th>Amount</th>
              <th>Booking</th>
              <th>Payment</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: "center" }}>
                  No Bookings Found
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>
                    <strong>{booking.customerName}</strong>
                  </td>

                  <td>{booking.customerPhone}</td>

                  <td>{booking.bookingDate}</td>

                  <td>{booking.bookingTime}</td>

                  <td>{booking.numberOfGuests}</td>

                  <td>{booking.tableId}</td>

                  <td>₹ {booking.amount}</td>

                  <td>
                    <span
                      className={`badge badge-${booking.bookingStatus.toLowerCase()}`}
                    >
                      {booking.bookingStatus}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge badge-${booking.paymentStatus.toLowerCase()}`}
                    >
                      {booking.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}