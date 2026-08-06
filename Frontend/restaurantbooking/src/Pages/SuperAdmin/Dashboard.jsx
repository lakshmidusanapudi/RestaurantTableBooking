import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { SUPER_ADMIN_MENU } from "../../config/menus";
import axiosClient from "../../api/axiosClient";

export default function Dashboard() {
  const [stats, setStats] = useState({
    restaurants: 48,
    pendingOwners: 6,
    customers: 1204,
    bookingsToday: 87,
  });

  useEffect(() => {
    axiosClient
      .get("/super-admin/stats")
      .then((res) => setStats(res.data))
      .catch(() => {
        /* keep sample stats if the backend isn't running yet */
      });
  }, []);

  return (
    <DashboardLayout brandLabel="Tavola Admin" roleTag="Super Admin" menu={SUPER_ADMIN_MENU}>
      <div className="dash-topbar">
        <div>
          <h1>Platform overview</h1>
          <p>A snapshot of restaurants, owners, and bookings across Tavola.</p>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-label">Restaurants</div>
          <div className="stat-value">{stats.restaurants}</div>
          <div className="stat-delta">Active on platform</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pending Owners</div>
          <div className="stat-value">{stats.pendingOwners}</div>
          <div className="stat-delta down">Awaiting approval</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Customers</div>
          <div className="stat-value">{stats.customers}</div>
          <div className="stat-delta">Registered diners</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Bookings Today</div>
          <div className="stat-value">{stats.bookingsToday}</div>
          <div className="stat-delta">Across all restaurants</div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <div>
            <h3>Owners waiting on approval</h3>
            <p>New restaurant-owner sign-ups needing review.</p>
          </div>
          <a className="btn-sm primary" href="/super-admin/owners">
            Review owners
          </a>
        </div>
        <div className="empty-state">
          <h4>Head to the Owners tab</h4>
          <p>Approve or reject pending restaurant-owner accounts from there.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
