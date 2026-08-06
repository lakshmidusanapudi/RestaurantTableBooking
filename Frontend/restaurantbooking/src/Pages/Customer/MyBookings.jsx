import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DashboardLayout from "../../components/DashboardLayout";
import { CUSTOMER_MENU } from "../../config/menus";
import {
  getMyBookings,
  cancelBooking,
} from "../../api/apis";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getMyBookings();
      console.log(data)
      setBookings(data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    try {
      await cancelBooking(id);
      toast.success("Booking cancelled");
      fetchBookings();
    } catch (err) {
      console.log(err);
      toast.error("Unable to cancel booking");
    }
  };

  if (loading) {
    return (
      <DashboardLayout
        brandLabel="Tavola"
        roleTag="Customer"
        menu={CUSTOMER_MENU}
      >
        <h3>Loading...</h3>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      brandLabel="Tavola"
      roleTag="Customer"
      menu={CUSTOMER_MENU}
    >
      <div className="dash-topbar">
        <div>
          <h1>My Bookings</h1>
          <p>Your booking history.</p>
        </div>
      </div>

      <div className="panel">
        <table>
          <thead>
            <tr>
              <th>Booking Date</th>
              <th>Booking Time</th>
              <th>Guests</th>
              <th>Special Request</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No Bookings Found
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.bookingDate}</td>

                  <td>{b.bookingTime?.substring(0, 5)}</td>

                  <td>{b.numberOfGuests}</td>

                  <td>{b.specialRequest || "-"}</td>

                  <td>₹{b.amount}</td>

                  <td>
                    <span
                      className={`badge badge-${b.paymentStatus.toLowerCase()}`}
                    >
                      {b.paymentStatus}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge badge-${b.bookingStatus.toLowerCase()}`}
                    >
                      {b.bookingStatus}
                    </span>
                  </td>

                  <td>
                    {(b.bookingStatus === "PENDING" ||
                      b.bookingStatus === "CONFIRMED") && (
                      <button
                        className="btn-sm danger"
                        onClick={() => handleCancel(b.id)}
                      >
                        Cancel
                      </button>
                    )}
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