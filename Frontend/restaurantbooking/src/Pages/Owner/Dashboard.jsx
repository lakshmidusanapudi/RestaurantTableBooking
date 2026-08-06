import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { OWNER_MENU } from "../../config/menus";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout brandLabel="Tavola for Restaurants" roleTag="Restaurant Owner" menu={OWNER_MENU}>
      <div className="dash-topbar">
        <div>
          <h1>Welcome back, {user?.name?.split(" ")[0] || "Owner"}</h1>
          <p>Here's how your restaurant is doing today.</p>
        </div>
        <span className="status-pill approved">Account Approved</span>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-label">Today's Bookings</div>
          <div className="stat-value">14</div>
          <div className="stat-delta">3 upcoming this hour</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Tables</div>
          <div className="stat-value">18</div>
          <div className="stat-delta">12 currently free</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Occupancy</div>
          <div className="stat-value">67%</div>
          <div className="stat-delta">Peak at 8 PM</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">This Week</div>
          <div className="stat-value">96</div>
          <div className="stat-delta">Total reservations</div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <div>
            <h3>Upcoming reservations</h3>
            <p>Next few tables booked for today.</p>
          </div>
          <a className="btn-sm primary" href="/owner/bookings">View all</a>
        </div>
        <table>
          <thead>
            <tr><th>Time</th><th>Guest</th><th>Guests</th><th>Table</th><th>Status</th></tr>
          </thead>
          <tbody>
            <tr><td>7:00 PM</td><td>Riya Kapoor</td><td>4</td><td>12</td><td><span className="badge badge-confirmed">Confirmed</span></td></tr>
            <tr><td>7:30 PM</td><td>Daniel Ortiz</td><td>6</td><td>05</td><td><span className="badge badge-confirmed">Confirmed</span></td></tr>
            <tr><td>8:15 PM</td><td>Sara Lindqvist</td><td>2</td><td>02</td><td><span className="badge badge-pending">Pending</span></td></tr>
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
