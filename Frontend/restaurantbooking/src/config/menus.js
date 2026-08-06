export const SUPER_ADMIN_MENU = [
  { to: "/super-admin/dashboard", label: "Dashboard", icon: "dashboard", end: true },
  { to: "/super-admin/restaurants", label: "Restaurants", icon: "restaurant" },
  { to: "/super-admin/owners", label: "Owners", icon: "people" },
  { to: "/super-admin/customers", label: "Customers", icon: "people" },
 
];

export const OWNER_MENU = [
  { to: "/owner/dashboard", label: "Dashboard", icon: "dashboard", end: true },
  { to: "/owner/restaurant", label: "Restaurant", icon: "restaurant" },
  { to: "/owner/tables", label: "Tables", icon: "tables" },
  { to: "/owner/bookings", label: "Bookings", icon: "bookings" },
  { to: "/owner/payment-config", label: "Payment Config", icon: "payment" },
];

export const CUSTOMER_MENU = [
  { to: "/customer/dashboard", label: "Dashboard", icon: "dashboard", end: true },
  { to: "/customer/restaurants", label: "Restaurants", icon: "search" },
  { to: "/customer/my-bookings", label: "My Bookings", icon: "book" },
];
