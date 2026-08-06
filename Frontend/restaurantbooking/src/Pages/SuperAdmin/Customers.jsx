import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DashboardLayout from "../../components/DashboardLayout";
import { SUPER_ADMIN_MENU } from "../../config/menus";
import { getCustomers } from "../../api/apis";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load customers");
    } finally {
      setLoading(false);
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
          <h1>Customers</h1>
          <p>All registered customers.</p>
        </div>
      </div>

      <div className="panel">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No Customers Found
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <strong>{customer.name}</strong>
                  </td>

                  <td>{customer.email}</td>

                  <td>{customer.phone}</td>

                  <td>{customer.role}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}