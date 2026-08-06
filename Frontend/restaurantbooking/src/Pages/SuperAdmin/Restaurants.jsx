import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { SUPER_ADMIN_MENU } from "../../config/menus";
import { toast } from "react-toastify";
import {
  getRestaurants,
  getRestaurantById,
} from "../../api/apis";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const data = await getRestaurants();
      setRestaurants(data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load restaurants");
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (id) => {
    try {
      const data = await getRestaurantById(id);
      setSelectedRestaurant(data);
    } catch (err) {
      console.log(err);
      toast.error("Unable to load restaurant details");
    }
  };

  if (loading) {
    return (
      <DashboardLayout
        brandLabel="Tavola Admin"
        roleTag="Super Admin"
        menu={SUPER_ADMIN_MENU}
      >
        <h3>Loading...</h3>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      brandLabel="Tavola Admin"
      roleTag="Super Admin"
      menu={SUPER_ADMIN_MENU}
    >
      <div className="dash-topbar">
        <div>
          <h1>Restaurants</h1>
          <p>All registered restaurants.</p>
        </div>
      </div>

      <div className="panel">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Cuisine</th>
              <th>City</th>
              <th>Phone</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {restaurants.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No Restaurants Found
                </td>
              </tr>
            ) : (
              restaurants.map((r) => (
                <tr key={r.id}>
                  <td>
                    <strong>{r.restaurantName}</strong>
                  </td>

                  <td>{r.cuisineType}</td>

                  <td>{r.address?.city}</td>

                  <td>{r.phone}</td>

                  <td>
                    <span
                      className={`badge ${
                        r.active
                          ? "badge-approved"
                          : "badge-rejected"
                      }`}
                    >
                      {r.active ? "ACTIVE" : "INACTIVE"}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn-sm"
                      onClick={() => handleView(r.id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedRestaurant && (
        <div className="panel" style={{ marginTop: 20 }}>
          <div
            className="panel-head"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h3>Restaurant Details</h3>

            <button
              className="btn-sm"
              onClick={() => setSelectedRestaurant(null)}
            >
              Close
            </button>
          </div>

          <div style={{ padding: 24 }}>
            {selectedRestaurant.images?.length > 0 && (
              <img
                src={selectedRestaurant.images[0]}
                alt="Restaurant"
                style={{
                  width: 300,
                  borderRadius: 10,
                  marginBottom: 20,
                }}
              />
            )}

            <p><strong>Name:</strong> {selectedRestaurant.restaurantName}</p>

            <p><strong>Description:</strong> {selectedRestaurant.description}</p>

            <p><strong>Cuisine:</strong> {selectedRestaurant.cuisineType}</p>

            <p><strong>Email:</strong> {selectedRestaurant.email}</p>

            <p><strong>Phone:</strong> {selectedRestaurant.phone}</p>

            <p>
              <strong>Address:</strong>{" "}
              {selectedRestaurant.address?.addressLine1},{" "}
              {selectedRestaurant.address?.city},{" "}
              {selectedRestaurant.address?.state} -{" "}
              {selectedRestaurant.address?.pincode}
            </p>

            <p>
              <strong>Opening Time:</strong>{" "}
              {selectedRestaurant.openingTime}
            </p>

            <p>
              <strong>Closing Time:</strong>{" "}
              {selectedRestaurant.closingTime}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {selectedRestaurant.active ? "ACTIVE" : "INACTIVE"}
            </p>

            {selectedRestaurant.images?.length > 1 && (
              <>
                <h4>Gallery</h4>

                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                  }}
                >
                  {selectedRestaurant.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt=""
                      style={{
                        width: 120,
                        height: 120,
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}