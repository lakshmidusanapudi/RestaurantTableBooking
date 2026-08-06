import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import { CUSTOMER_MENU } from "../../config/menus";
import {
  getTablesByRestaurant,
  createBooking,
  createPaymentOrder,
  verifyPayment,
} from "../../api/apis"; 

const RAZORPAY_KEY = "YOUR_RAZORPAY_KEY";

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function RestaurantDetail() {
  const { id: restaurantId } = useParams();

  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeTable, setActiveTable] = useState(null);
  const [form, setForm] = useState({
    bookingDate: "",
    bookingTime: "",
    numberOfGuests: 2,
    specialRequest: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState("");

  useEffect(() => {
    const fetchTables = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getTablesByRestaurant(restaurantId);
        setTables(Array.isArray(data) ? data : data.content || []);
      } catch (err) {
        setError(err?.response?.data?.message || "Something went wrong while loading tables.");
      } finally {
        setLoading(false);
      }
    };
    if (restaurantId) fetchTables();
  }, [restaurantId]);

  const openBooking = (table) => {
    setActiveTable(table);
    setForm({
      bookingDate: "",
      bookingTime: "",
      numberOfGuests: Math.min(2, table.capacity),
      specialRequest: "",
    });
    setBookingError("");
    setBookingSuccess("");
  };

  const closeBooking = () => {
    if (submitting) return;
    setActiveTable(null);
  };

  const handleFormChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  // Create the payment order on the backend, launch Razorpay checkout, verify on success
  const runPayment = async (booking) => {
    const order = await createPaymentOrder({ bookingId: booking.id });

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) throw new Error("Could not load payment gateway. Check your connection.");

    return new Promise((resolve, reject) => {
      const rzp = new window.Razorpay({
        key: order.key || RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency || "INR",
        order_id: order.razorpayOrderId || order.orderId || order.id,
        name: "Tavola",
        description: `Table booking - ${activeTable.tableNumber}`,
        handler: async (response) => {
          try {
            const result = await verifyPayment({
              bookingId: booking.id,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            resolve(result);
          } catch (err) {
            reject(err);
          }
        },
        modal: {
          ondismiss: () => reject(new Error("Payment was cancelled.")),
        },
        theme: { color: "#8a6d3b" },
      });
      rzp.open();
    });
  };

  const submitBooking = async (e) => {
    e.preventDefault();
    if (!activeTable) return;
    setSubmitting(true);
    setBookingError("");
    setBookingSuccess("");
    try {
      const booking = await createBooking({
        restaurantId,
        tableId: activeTable.id,
        bookingDate: form.bookingDate,
        bookingTime: form.bookingTime,
        numberOfGuests: Number(form.numberOfGuests),
        specialRequest: form.specialRequest,
      });

      if (activeTable.advancePaymentRequired) {
        await runPayment(booking);
        setBookingSuccess("Payment successful! Your table is booked.");
      } else {
        setBookingSuccess("Table booked! You'll get a confirmation shortly.");
      }
      setTables((prev) =>
        prev.map((t) => (t.id === activeTable.id ? { ...t, available: false } : t))
      );
      setTimeout(() => setActiveTable(null), 1500);
    } catch (err) {
      setBookingError(err?.response?.data?.message || err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout brandLabel="Tavola" roleTag="Customer" menu={CUSTOMER_MENU}>
      <div className="dash-topbar">
        <div>
          <h1>Tables</h1>
          <p>Pick a table and reserve it.</p>
        </div>
      </div>

      {loading && <p>Loading tables…</p>}
      {!loading && error && <p style={{ color: "var(--danger, #c0392b)" }}>{error}</p>}
      {!loading && !error && tables.length === 0 && <p>No tables found for this restaurant.</p>}

      <div className="card-grid">
        {tables.map((t) => (
          <div className="simple-card" key={t.id}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <strong style={{ fontFamily: "'Fraunces',serif", fontSize: "1.1rem" }}>
                Table {t.tableNumber}
              </strong>
              <span style={{ fontSize: "0.85rem", color: t.available ? "var(--brass)" : "#c0392b" }}>
                {t.available ? "Available" : "Unavailable"}
              </span>
            </div>
            <p style={{ color: "var(--text-soft)", fontSize: "0.85rem", marginBottom: 8 }}>
              Seats {t.capacity} · {t.tableType} · {t.tableLocation}
            </p>
            <p style={{ fontSize: "0.9rem", marginBottom: 16 }}>
              ₹{t.bookingPrice} {t.advancePaymentRequired ? "(advance required)" : ""}
            </p>
            <button
              className="btn-sm primary"
              disabled={!t.available}
              onClick={() => openBooking(t)}
            >
              Book Table
            </button>
          </div>
        ))}
      </div>

      {activeTable && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
          onClick={closeBooking}
        >
          <div
            className="simple-card"
            style={{ width: 380, maxWidth: "90vw" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontFamily: "'Fraunces',serif", marginBottom: 4 }}>
              Book Table {activeTable.tableNumber}
            </h3>
            <p style={{ color: "var(--text-soft)", fontSize: "0.85rem", marginBottom: 16 }}>
              Seats {activeTable.capacity} · ₹{activeTable.bookingPrice}
            </p>

            <form onSubmit={submitBooking}>
              <div className="field" style={{ marginBottom: 12 }}>
                <label>Date</label>
                <input
                  type="date"
                  required
                  value={form.bookingDate}
                  onChange={(e) => handleFormChange("bookingDate", e.target.value)}
                />
              </div>
              <div className="field" style={{ marginBottom: 12 }}>
                <label>Time</label>
                <input
                  type="time"
                  required
                  value={form.bookingTime}
                  onChange={(e) => handleFormChange("bookingTime", e.target.value)}
                />
              </div>
              <div className="field" style={{ marginBottom: 12 }}>
                <label>Guests</label>
                <input
                  type="number"
                  min={1}
                  max={activeTable.capacity}
                  required
                  value={form.numberOfGuests}
                  onChange={(e) => handleFormChange("numberOfGuests", e.target.value)}
                />
              </div>
              <div className="field" style={{ marginBottom: 16 }}>
                <label>Special request</label>
                <input
                  placeholder="e.g. Birthday Decoration"
                  value={form.specialRequest}
                  onChange={(e) => handleFormChange("specialRequest", e.target.value)}
                />
              </div>

              {bookingError && <p style={{ color: "#c0392b", marginBottom: 12 }}>{bookingError}</p>}
              {bookingSuccess && <p style={{ color: "green", marginBottom: 12 }}>{bookingSuccess}</p>}

              <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                <button type="button" className="btn-sm" onClick={closeBooking} disabled={submitting}>
                  Cancel
                </button>
                <button type="submit" className="btn-sm primary" disabled={submitting}>
                  {submitting
                    ? "Processing…"
                    : activeTable.advancePaymentRequired
                    ? "Pay & Book"
                    : "Confirm Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}