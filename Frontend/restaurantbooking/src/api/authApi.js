import axiosClient from "./axiosClient";

/**
 * Customer Registration
 * POST /api/auth/customer/register
 */
export const registerCustomer = (payload) =>
  axiosClient.post("/auth/customer/register", payload).then((res) => res.data);

/**
 * Restaurant Owner Registration
 * POST /api/auth/owner/register
 */
export const registerOwner = (payload) =>
  axiosClient.post("/auth/owner/register", payload).then((res) => res.data);

/**
 * Login
 * POST /api/auth/login
 */
export const loginUser = (payload) =>
  axiosClient.post("/auth/login", payload).then((res) => res.data);