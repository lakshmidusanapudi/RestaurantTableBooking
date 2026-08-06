import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import { CUSTOMER_MENU } from "../../config/menus";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout brandLabel="Tavola" roleTag="Customer" menu={CUSTOMER_MENU}>
      <div className="dash-topbar">
        <div>
          <h1>Hi, {user?.name?.split(" ")[0] || "there"}</h1>
          <p>Ready for your next table?</p>
        </div>
        <Link to="/customer/restaurants" className="btn-sm primary">Find a restaurant</Link>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-label">Upcoming</div>
          <div className="stat-value">2</div>
          <div className="stat-delta">Next: Aug 14, 7:30 PM</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Bookings</div>
          <div className="stat-value">12</div>
          <div className="stat-delta">Since you joined</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Favourite Cuisine</div>
          <div className="stat-value">Italian</div>
          <div className="stat-delta">Based on your history</div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <div>
            <h3>Your next reservation</h3>
            <p>Casa Lumen · Aug 14, 7:30 PM · 4 guests</p>
          </div>
          <Link className="btn-sm primary" to="/customer/my-bookings">View all bookings</Link>
        </div>
        <div className="empty-state" style={{ padding: "30px 24px" }}>
          <h4>Table 12, Terrace</h4>
          <p>Confirmed — a reminder will be sent 2 hours before.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
