import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DashboardLayout from "../../components/DashboardLayout";
import { SUPER_ADMIN_MENU } from "../../config/menus";
import {
  getOwners,
  approveOwner,
  rejectOwner,
} from "../../api/apis";

export default function Owners() {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    try {
      const data = await getOwners();
      setOwners(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load owners");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveOwner(id);
      toast.success("Owner approved successfully");
      fetchOwners();
    } catch (err) {
      console.error(err);
      toast.error("Approval failed");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectOwner(id);
      toast.success("Owner rejected successfully");
      fetchOwners();
    } catch (err) {
      console.error(err);
      toast.error("Reject failed");
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
          <h1>Restaurant Owners</h1>
          <p>
            Approve or reject restaurant owner registrations.
          </p>
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
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {owners.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  style={{ textAlign: "center", padding: 20 }}
                >
                  No Owners Found
                </td>
              </tr>
            ) : (
              owners.map((owner) => (
                <tr key={owner.id}>
                  <td>
                    <strong>{owner.name}</strong>
                  </td>

                  <td>{owner.email}</td>

                  <td>{owner.phone}</td>

                  <td>{owner.role}</td>

                  <td>
                    <span
                      className={`badge badge-${owner.status.toLowerCase()}`}
                    >
                      {owner.status}
                    </span>
                  </td>

                  <td style={{ textAlign: "right" }}>
                    {owner.status !== "APPROVED" && (
                      <button
                        className="btn-sm success"
                        style={{ marginRight: 8 }}
                        onClick={() =>
                          handleApprove(owner.id)
                        }
                      >
                        Approve
                      </button>
                    )}

                    {owner.status !== "REJECTED" && (
                      <button
                        className="btn-sm danger"
                        onClick={() =>
                          handleReject(owner.id)
                        }
                      >
                        Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}