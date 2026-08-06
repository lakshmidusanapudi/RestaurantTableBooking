import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import { CUSTOMER_MENU } from "../../config/menus";

export default function Booking() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const restaurantId = params.get("restaurant") || "1";

  const [form, setForm] = useState({ date: "", time: "", guests: 2, seating: "Any" });
  const [confirmed, setConfirmed] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // POST /api/customer/bookings  { restaurantId, ...form }
    setConfirmed(true);
    setTimeout(() => navigate("/customer/my-bookings"), 1500);
  };

  return (
    <DashboardLayout brandLabel="Tavola" roleTag="Customer" menu={CUSTOMER_MENU}>
      <div className="dash-topbar">
        <div>
          <h1>Book a table</h1>
          <p>Reserving at restaurant #{restaurantId}.</p>
        </div>
      </div>

      <div className="panel">
        <div style={{ padding: 24, maxWidth: 480 }}>
          {confirmed && <div className="alert alert-success">Booking confirmed! Redirecting to your bookings…</div>}
          <form onSubmit={onSubmit}>
            <div className="form-grid">
              <div className="field">
                <label>Date</label>
                <input type="date" name="date" required value={form.date} onChange={onChange} />
              </div>
              <div className="field">
                <label>Time</label>
                <input type="time" name="time" required value={form.time} onChange={onChange} />
              </div>
              <div className="field">
                <label>Guests</label>
                <input type="number" name="guests" min="1" max="20" value={form.guests} onChange={onChange} />
              </div>
              <div className="field">
                <label>Seating preference</label>
                <select name="seating" value={form.seating} onChange={onChange}>
                  <option>Any</option>
                  <option>Terrace</option>
                  <option>Window</option>
                  <option>Booth</option>
                </select>
              </div>
            </div>
            <button className="btn-block" type="submit">Confirm reservation</button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
