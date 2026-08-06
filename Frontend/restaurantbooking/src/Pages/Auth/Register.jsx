import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { registerCustomer, registerOwner } from "../../api/authApi";
import { toast } from "react-toastify";

const RoleIcon = ({ type }) =>
  type === "owner" ? (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path d="M4 3V17M4 3C4 5 6 5 6 7C6 9 4 9 4 11M16 3V17M16 3C13 3 12 5 12 8C12 9.5 13 10 14 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path d="M10 10a3.5 3.5 0 100-7 3.5 3.5 0 000 7ZM4 17c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState("CUSTOMER"); // "CUSTOMER" | "RESTAURANT_OWNER"
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

const onSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
    };

    if (role === "CUSTOMER") {
      await registerCustomer(payload);

      toast.success("🎉 Registration successful! Please login.");
    } else {
      await registerOwner(payload);

      toast.success(
        "🎉 Registration successful! Your account is pending admin approval."
      );
    }

    setTimeout(() => navigate("/login"), 1500);
  } catch (err) {
    toast.error(
      err?.response?.data?.message || "Registration failed."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="auth-shell">
      <div className="auth-side">
        <div className="auth-logo">
          Tavola<span>.</span>
        </div>
        <div>
          <h2>List your restaurant, or find your next one.</h2>
          <p>
            Restaurant owners get a dashboard to manage tables and bookings. Diners get a minute-long
            reservation flow. Pick the account that's you.
          </p>
        </div>
        <p style={{ fontSize: "0.78rem", color: "rgba(246,241,231,0.4)" }}>
          © 2026 Tavola. All rights reserved.
        </p>
      </div>

      <div className="auth-form-col">
        <div className="auth-card">
          <p className="eyebrow">Create Account</p>
          <h1>Join Tavola</h1>
          <p className="sub">Tell us who you are and we'll set up the right dashboard.</p>

          <div className="role-toggle">
            <button
              type="button"
              className={role === "CUSTOMER" ? "active" : ""}
              onClick={() => setRole("CUSTOMER")}
            >
              <RoleIcon type="customer" /> I'm a Customer
            </button>
            <button
              type="button"
              className={role === "RESTAURANT_OWNER" ? "active" : ""}
              onClick={() => setRole("RESTAURANT_OWNER")}
            >
              <RoleIcon type="owner" /> I'm a Restaurant Owner
            </button>
          </div>

          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={onSubmit}>
            <div className="field">
              <label>Full name</label>
              <input name="name" required value={form.name} onChange={onChange} placeholder="Jane Doe" />
            </div>
            <div className="field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={onChange}
                placeholder="you@example.com"
              />
            </div>
            <div className="field">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                required
                value={form.phone}
                onChange={onChange}
                placeholder="+91 98765 43210"
              />
            </div>
            <div className="field">
              <label>Password</label>
              <input
                type="password"
                name="password"
                required
                minLength={6}
                value={form.password}
                onChange={onChange}
                placeholder="At least 6 characters"
              />
            </div>

            {role === "RESTAURANT_OWNER" && (
              <div className="alert alert-warning">
                Restaurant-owner accounts need approval from a Tavola admin before you can log in.
              </div>
            )}

            <button className="btn-block" type="submit" disabled={loading}>
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="auth-alt">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
