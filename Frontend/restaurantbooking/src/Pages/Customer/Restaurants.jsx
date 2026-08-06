import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import { CUSTOMER_MENU } from "../../config/menus";
import { getRestaurants } from "../../api/apis"; // adjust the path to wherever api.js lives

export default function Restaurants() {
  const [query, setQuery] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getRestaurants();
        // Handles both a plain array response and a paginated { content: [...] } response
        setRestaurants(Array.isArray(data) ? data : data.content || []);
      } catch (err) {
        setError(err?.response?.data?.message || "Something went wrong while loading restaurants.");
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  const filtered = restaurants.filter((r) =>
    (r.restaurantName || "").toLowerCase().includes(query.toLowerCase())
  );

  return (
    <DashboardLayout brandLabel="Tavola" roleTag="Customer" menu={CUSTOMER_MENU}>
      <div className="dash-topbar">
        <div>
          <h1>Find a restaurant</h1>
          <p>Search and reserve a table in a couple of taps.</p>
        </div>
      </div>

      <div className="field" style={{ maxWidth: 360, marginBottom: 26 }}>
        <input
          placeholder="Search restaurants…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading && <p>Loading restaurants…</p>}
      {!loading && error && (
        <p style={{ color: "var(--danger, #c0392b)" }}>{error}</p>
      )}
      {!loading && !error && filtered.length === 0 && <p>No restaurants found.</p>}

      <div className="card-grid">
        {filtered.map((r) => (
          <div className="simple-card" key={r.id}>
            {r.images?.[0] && (
              <img
                src={r.images[0]}
                alt={r.restaurantName}
                style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 10, marginBottom: 12 }}
              />
            )}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <strong style={{ fontFamily: "'Fraunces',serif", fontSize: "1.1rem" }}>
                {r.restaurantName}
              </strong>
            </div>
            <p style={{ color: "var(--text-soft)", fontSize: "0.85rem", marginBottom: 4 }}>
              {[r.cuisineType, r.address?.city].filter(Boolean).join(" · ")}
            </p>
            <p style={{ color: "var(--text-soft)", fontSize: "0.8rem", marginBottom: 16 }}>
              {r.openingTime} – {r.closingTime}
            </p>
            <Link to={`/customer/restaurants/${r.id}`} className="btn-sm primary">
              View & book
            </Link>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}