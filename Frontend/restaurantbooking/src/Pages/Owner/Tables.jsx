import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DashboardLayout from "../../components/DashboardLayout";
import { OWNER_MENU } from "../../config/menus";

import {
  getMyTables,
  getTableById,
  addTable,
  updateTable,
  deleteTable,
} from "../../api/apis";

export default function Tables() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    tableNumber: "",
    capacity: "",
    tableType: "",
    tableLocation: "",
    available: true,
    bookingPrice: "",
    advancePaymentRequired: false,
  });

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const data = await getMyTables();
      setTables(data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load tables");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setForm({
      tableNumber: "",
      capacity: "",
      tableType: "",
      tableLocation: "",
      available: true,
      bookingPrice: "",
      advancePaymentRequired: false,
    });

    setEditingId(null);
  };

  const handleAdd = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEdit = async (id) => {
    try {
      const data = await getTableById(id);

      setEditingId(id);

      setForm({
        tableNumber: data.tableNumber || "",
        capacity: data.capacity || "",
        tableType: data.tableType || "",
        tableLocation: data.tableLocation || "",
        available: data.available,
        bookingPrice: data.bookingPrice || "",
        advancePaymentRequired:
          data.advancePaymentRequired || false,
      });

      setShowForm(true);
    } catch (err) {
      console.log(err);
      toast.error("Unable to load table");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this table?")) return;

    try {
      await deleteTable(id);

      toast.success("Table deleted");

      fetchTables();
    } catch (err) {
      console.log(err);
      toast.error("Delete failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      tableNumber: form.tableNumber,
      capacity: Number(form.capacity),
      tableType: form.tableType,
      tableLocation: form.tableLocation,
      available: form.available,
      bookingPrice: Number(form.bookingPrice),
      advancePaymentRequired:
        form.advancePaymentRequired,
    };

    try {
      if (editingId) {
        await updateTable(editingId, payload);

        toast.success("Table updated successfully");
      } else {
        await addTable(payload);

        toast.success("Table added successfully");
      }

      setShowForm(false);
      resetForm();
      fetchTables();

    } catch (err) {
      console.log(err);

      toast.error(
        err?.response?.data?.message || "Operation failed"
      );
    }
  };

  if (loading) {
    return (
      <DashboardLayout
        brandLabel="Tavola for Restaurants"
        roleTag="Restaurant Owner"
        menu={OWNER_MENU}
      >
        <h3>Loading...</h3>
      </DashboardLayout>
    );
  }  return (
    <DashboardLayout
      brandLabel="Tavola for Restaurants"
      roleTag="Restaurant Owner"
      menu={OWNER_MENU}
    >
      <div className="dash-topbar">
        <div>
          <h1>Tables</h1>
          <p>Manage your restaurant tables.</p>
        </div>

        <button className="btn-sm primary" onClick={handleAdd}>
          + Add Table
        </button>
      </div>

      {showForm && (
        <div className="panel" style={{ marginBottom: 25 }}>
          <div className="panel-head">
            <h3>{editingId ? "Update Table" : "Add Table"}</h3>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{ padding: 20 }}
          >
            <div className="form-grid">

              <div className="field">
                <label>Table Number</label>
                <input
                  name="tableNumber"
                  value={form.tableNumber}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="field">
                <label>Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  value={form.capacity}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="field">
                <label>Table Type</label>
                <select
                  name="tableType"
                  value={form.tableType}
                  onChange={onChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="AC">AC</option>
                  <option value="NON-AC">NON-AC</option>
                 
                </select>
              </div>

              <div className="field">
                <label>Location</label>
                <select
                  name="tableLocation"
                  value={form.tableLocation}
                  onChange={onChange}
                  required
                >
                  <option value="">Select</option>
                 
                  <option value="INDOOR">INDOOR</option>
                  <option value="OUTDOOR">OUTDOOR</option>
                </select>
              </div>

              <div className="field">
                <label>Booking Price</label>
                <input
                  type="number"
                  name="bookingPrice"
                  value={form.bookingPrice}
                  onChange={onChange}
                />
              </div>

            </div>

            <div
              style={{
                display: "flex",
                gap: 25,
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <label>
                <input
                  type="checkbox"
                  name="available"
                  checked={form.available}
                  onChange={onChange}
                />
                &nbsp;Available
              </label>

              <label>
                <input
                  type="checkbox"
                  name="advancePaymentRequired"
                  checked={form.advancePaymentRequired}
                  onChange={onChange}
                />
                &nbsp;Advance Payment Required
              </label>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                className="btn-sm primary"
                type="submit"
              >
                {editingId ? "Update" : "Add Table"}
              </button>

              <button
                type="button"
                className="btn-sm"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card-grid">
        {tables.length === 0 ? (
          <h3>No Tables Found</h3>
        ) : (
          tables.map((table) => (
            <div
              className="simple-card"
              key={table.id}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <strong
                  style={{
                    fontSize: "1.2rem",
                  }}
                >
                  Table {table.tableNumber}
                </strong>

                <span
                  className={`badge ${
                    table.available
                      ? "badge-approved"
                      : "badge-pending"
                  }`}
                >
                  {table.available
                    ? "Available"
                    : "Booked"}
                </span>
              </div>

              <p>
                <strong>Capacity:</strong>{" "}
                {table.capacity}
              </p>

              <p>
                <strong>Type:</strong>{" "}
                {table.tableType}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {table.tableLocation}
              </p>

              <p>
                <strong>Booking Price:</strong> ₹
                {table.bookingPrice}
              </p>

              <p>
                <strong>Advance Payment:</strong>{" "}
                {table.advancePaymentRequired
                  ? "Yes"
                  : "No"}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  marginTop: 15,
                }}
              >
                <button
                  className="btn-sm"
                  onClick={() =>
                    handleEdit(table.id)
                  }
                >
                  Edit
                </button>

                <button
                  className="btn-sm danger"
                  onClick={() =>
                    handleDelete(table.id)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}