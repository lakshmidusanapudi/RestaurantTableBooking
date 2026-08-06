import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth, ROLE_HOME } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";

import SADashboard from "./Pages/SuperAdmin/Dashboard";
import SARestaurants from "./Pages/SuperAdmin/Restaurants";
import SAOwners from "./Pages/SuperAdmin/Owners";
import SACustomers from "./Pages/SuperAdmin/Customers";


import OwnerDashboard from "./Pages/Owner/Dashboard";
import OwnerRestaurant from "./Pages/Owner/Restaurant";
import OwnerTables from "./Pages/Owner/Tables";
import OwnerBookings from "./Pages/Owner/Bookings";
import OwnerPaymentConfig from "./Pages/Owner/PaymentConfig";
import OwnerPending from "./Pages/Owner/Pending";

import CustomerDashboard from "./Pages/Customer/Dashboard";
import CustomerRestaurants from "./Pages/Customer/Restaurants";
import CustomerRestaurantDetails from "./Pages/Customer/RestaurantDetails";
import CustomerBooking from "./Pages/Customer/Booking";
import CustomerMyBookings from "./Pages/Customer/MyBookings";

import LandingPage from "./Pages/Landing/LandingPage";

function RootRedirect() {
  const { user } = useAuth();
  if (!user) return <LandingPage />;
  return <Navigate to={ROLE_HOME[user.role] || "/login"} replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<RootRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/owner/pending" element={<OwnerPending />} />

          {/* Super Admin */}
          <Route
            path="/super-admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
                <SADashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/restaurants"
            element={
              <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
                <SARestaurants />
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/owners"
            element={
              <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
                <SAOwners />
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/customers"
            element={
              <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
                <SACustomers />
              </ProtectedRoute>
            }
          />
        

          {/* Owner */}
          <Route
            path="/owner/dashboard"
            element={
              <ProtectedRoute allowedRoles={["RESTAURANT_OWNER"]}>
                <OwnerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/owner/restaurant"
            element={
              <ProtectedRoute allowedRoles={["RESTAURANT_OWNER"]}>
                <OwnerRestaurant />
              </ProtectedRoute>
            }
          />
          <Route
            path="/owner/tables"
            element={
              <ProtectedRoute allowedRoles={["RESTAURANT_OWNER"]}>
                <OwnerTables />
              </ProtectedRoute>
            }
          />
          <Route
            path="/owner/bookings"
            element={
              <ProtectedRoute allowedRoles={["RESTAURANT_OWNER"]}>
                <OwnerBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/owner/payment-config"
            element={
              <ProtectedRoute allowedRoles={["RESTAURANT_OWNER"]}>
                <OwnerPaymentConfig />
              </ProtectedRoute>
            }
          />

          {/* Customer */}
          <Route
            path="/customer/dashboard"
            element={
              <ProtectedRoute allowedRoles={["CUSTOMER"]}>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/restaurants"
            element={
              <ProtectedRoute allowedRoles={["CUSTOMER"]}>
                <CustomerRestaurants />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/restaurants/:id"
            element={
              <ProtectedRoute allowedRoles={["CUSTOMER"]}>
                <CustomerRestaurantDetails />
              </ProtectedRoute>
            }
          />
        
          <Route
            path="/customer/my-bookings"
            element={
              <ProtectedRoute allowedRoles={["CUSTOMER"]}>
                <CustomerMyBookings />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </AuthProvider>
  );
}