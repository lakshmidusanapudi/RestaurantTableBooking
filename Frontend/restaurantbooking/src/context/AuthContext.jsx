import React, { createContext, useContext, useState } from "react";
import {
  loginUser,
  registerCustomer,
  registerOwner,
} from "../api/authApi";

const AuthContext = createContext(null);

// Where each role lands after a successful, approved login
export const ROLE_HOME = {
  SUPER_ADMIN: "/super-admin/dashboard",
  RESTAURANT_OWNER: "/owner/dashboard",
  CUSTOMER: "/customer/dashboard",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("tavola_user");
    return raw ? JSON.parse(raw) : null;
  });

  const persist = (token, userObj) => {
    if (token) {
      localStorage.setItem("tavola_token", token);
    }

    localStorage.setItem("tavola_user", JSON.stringify(userObj));
    setUser(userObj);
  };

  // Login
  const login = async (email, password) => {
  const data = await loginUser({ email, password });

  const user = {
    userId: data.userId,
    name: data.name,
    email: data.email,
    role: data.role,
  };

  persist(data.token, user);

  return user;
};
  // Register
  const register = async ({
    name,
    email,
    phone,
    password,
    role,
  }) => {
    const payload = {
      name,
      email,
      phone,
      password,
    };

    if (role === "CUSTOMER") {
      return await registerCustomer(payload);
    }

    if (role === "RESTAURANT_OWNER") {
      return await registerOwner(payload);
    }

    throw new Error("Invalid user role.");
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("tavola_token");
    localStorage.removeItem("tavola_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);