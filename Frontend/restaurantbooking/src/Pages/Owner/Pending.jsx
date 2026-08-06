import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Pending() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const rejected = user?.status === "REJECTED";

  return (
    <div className="auth-shell">
      <div className="auth-side">
        <div className="auth-logo">
          Tavola<span>.</span>
        </div>
        <div>
          <h2>{rejected ? "Application not approved" : "Almost there."}</h2>
          <p>
            {rejected
              ? "Your restaurant-owner application was not approved. Reach out to our team if you think this is a mistake."
              : "Our team reviews every restaurant-owner account before it goes live, usually within one business day."}
          </p>
        </div>
      </div>
      <div className="auth-form-col">
        <div className="auth-card">
          <p className="eyebrow">Account Status</p>
          <h1>{rejected ? "Application rejected" : "Approval pending"}</h1>
          <div className={`alert ${rejected ? "alert-error" : "alert-warning"}`} style={{ marginTop: 18 }}>
            {rejected
              ? "Your account status is REJECTED. You won't be able to access the owner dashboard."
              : "Your account status is PENDING. You'll be able to log in as soon as an admin approves your restaurant."}
          </div>
          <button
            className="btn-block"
            style={{ marginTop: 10 }}
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Back to login
          </button>
        </div>
      </div>
    </div>
  );
}
