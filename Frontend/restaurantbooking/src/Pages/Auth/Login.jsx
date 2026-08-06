import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, ROLE_HOME } from "../../context/AuthContext";
import { toast } from "react-toastify";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

 const onSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

 try {
  const user = await login(form.email, form.password);
 console.log(user);
  toast.success(`Welcome back, ${user.name}!`);

  navigate(ROLE_HOME[user.role]);
} catch (err) {
  console.log("Error Response:", err.response);
  console.log("Error Data:", err.response?.data);

  const message =
    err?.response?.data?.message || "Invalid email or password.";

  if (message.includes("waiting for Super Admin approval")) {
    toast.warning(message);
    navigate("/owner/pending");
    return;
  }

  toast.error(message);
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
          <h2>Welcome back to the table.</h2>
          <p>
            Sign in to manage bookings, run your restaurant, or reserve your next table —
            everything's exactly where you left it.
          </p>
        </div>
        <p style={{ fontSize: "0.78rem", color: "rgba(246,241,231,0.4)" }}>
          © 2026 Tavola. All rights reserved.
        </p>
      </div>

      <div className="auth-form-col">
        <div className="auth-card">
          <p className="eyebrow">Sign In</p>
          <h1>Log in to your account</h1>
          <p className="sub">Enter your details to access your dashboard.</p>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={onSubmit}>
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
              <label>Password</label>
              <input
                type="password"
                name="password"
                required
                value={form.password}
                onChange={onChange}
                placeholder="••••••••"
              />
            </div>
            <button className="btn-block" type="submit" disabled={loading}>
              {loading ? "Signing in…" : "Log in"}
            </button>
          </form>

          <p className="auth-alt">
            New to Tavola? <Link to="/register">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
