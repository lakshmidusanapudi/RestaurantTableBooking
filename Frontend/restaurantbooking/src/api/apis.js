import axiosClient from "./axiosClient";

export const getRestaurant = () =>
  axiosClient.get("/restaurants/my").then((res) => res.data);

export const updateRestaurant = (id, formData) =>
  axiosClient.put(`/restaurants/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then((res) => res.data);

  

export const getMyTables = () =>
  axiosClient.get("/tables/my").then((res) => res.data);

export const getTableById = (id) =>
  axiosClient.get(`/tables/${id}`).then((res) => res.data);


export const addTable = (payload) =>
  axiosClient.post("/tables", payload).then((res) => res.data);


export const updateTable = (id, payload) =>
  axiosClient.put(`/tables/${id}`, payload).then((res) => res.data);


export const deleteTable = (id) =>
  axiosClient.delete(`/tables/${id}`).then((res) => res.data);

export const getPaymentConfig = () =>
  axiosClient.get("/payment-config").then(res => res.data);

export const addPaymentConfig = (payload) =>
  axiosClient.post("/payment-config", payload).then(res => res.data);

export const updatePaymentConfig = (payload) =>
  axiosClient.put("/payment-config", payload).then(res => res.data);

export const deletePaymentConfig = () =>
  axiosClient.delete("/payment-config").then(res => res.data);

export const getOwnerBookings = () =>
  axiosClient.get("/bookings/owner").then((res) => res.data);

// Get all owners
export const getOwners = () =>
  axiosClient.get("/superadmin/owners").then((res) => res.data);
// Get all customers
export const getCustomers = () =>
  axiosClient.get("/superadmin/customers").then((res) => res.data);

// Approve owner
export const approveOwner = (id) =>
  axiosClient
    .patch(`/superadmin/owners/${id}/approve`)
    .then((res) => res.data);

// Reject owner
export const rejectOwner = (id) =>
  axiosClient
    .patch(`/superadmin/owners/${id}/reject`)
    .then((res) => res.data);

export const getRestaurants = () =>
  axiosClient.get("/restaurants").then((res) => res.data);

export const getRestaurantById = (id) =>
  axiosClient.get(`/restaurants/${id}`).then((res) => res.data);

export const getMyBookings = () =>
  axiosClient.get("/bookings/my").then((res) => res.data);

export const cancelBooking = (id) =>
  axiosClient.patch(`/bookings/cancel/${id}`).then((res) => res.data);

export const getTablesByRestaurant = (restaurantId) =>
  axiosClient.get(`/tables/restaurants/${restaurantId}`).then((res) => res.data);
 
export const createBooking = (payload) =>
  axiosClient.post("/bookings", payload).then((res) => res.data);
 
export const createPaymentOrder = (payload) =>
  axiosClient.post("/payment/create-order", payload).then((res) => res.data);
 
export const verifyPayment = (payload) =>
  axiosClient.post("/payment/verify", payload).then((res) => res.data);