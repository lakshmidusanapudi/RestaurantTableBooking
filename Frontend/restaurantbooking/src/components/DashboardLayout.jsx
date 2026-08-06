import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Icon = ({ d }) => (
  <svg viewBox="0 0 20 20" fill="none">
    <path d={d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ICONS = {
  dashboard: "M3 10L10 3L17 10M5 8.5V17H15V8.5",
  restaurant: "M4 3V17M4 3C4 5 6 5 6 7C6 9 4 9 4 11M16 3V17M16 3C13 3 12 5 12 8C12 9.5 13 10 14 10H16",
  people: "M13 17V15.5C13 13.5 11.5 12 9.5 12H5.5C3.5 12 2 13.5 2 15.5V17M18 17V15.5C18 14 17 12.8 15.6 12.3M7.5 9C9.15 9 10.5 7.65 10.5 6C10.5 4.35 9.15 3 7.5 3C5.85 3 4.5 4.35 4.5 6C4.5 7.65 5.85 9 7.5 9ZM14 8C15.4 8 16.5 6.9 16.5 5.5C16.5 4.1 15.4 3 14 3",
  bookings: "M4 4H16V16H4V4Z M4 8H16 M7 2V6 M13 2V6",
  tables: "M2 6H18M4 6V17M16 6V17M2 6L4 2H16L18 6",
  payment: "M2 6H18V16H2V6Z M2 9H18 M5 13H8",
  search: "M9 16A7 7 0 109 2a7 7 0 000 14ZM17.5 17.5L14 14",
  cart: "M3 3H5L6.5 12.5H15L17 6H6",
  book: "M4 3H14C15.1 3 16 3.9 16 5V17L10 14L4 17V5C4 3.9 4.9 3 4 3Z",
};

export default function DashboardLayout({ brandLabel, roleTag, menu, children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initial = (user?.name || "?").trim().charAt(0).toUpperCase();

  return (
    <div className="dash-shell">
      <aside className="dash-sidebar">
        <div className="dash-logo">
          Tavola<span>.</span>
        </div>
        <div className="dash-role-tag">{roleTag}</div>

        <nav className="dash-nav">
          {menu.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Icon d={ICONS[item.icon]} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="dash-sidebar-foot">
          <div className="dash-user">
            <div className="dash-avatar">{initial}</div>
            <div>
              <strong>{user?.name || "Guest"}</strong>
              <span>{user?.email}</span>
            </div>
          </div>
          <button className="dash-logout" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </aside>

      <main className="dash-main">{children}</main>
    </div>
  );
}
