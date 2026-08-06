import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DashboardLayout from "../../components/DashboardLayout";
import { OWNER_MENU } from "../../config/menus";

import {
  getPaymentConfig,
  addPaymentConfig,
  updatePaymentConfig,
} from "../../api/apis";

export default function PaymentConfig() {

  const [exists, setExists] = useState(false);

  const [form, setForm] = useState({
    razorpayKeyId: "",
    razorpaySecret: "",
    active: true,
  });

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {

      const data = await getPaymentConfig();

      if (data) {
        setExists(true);

        setForm({
          razorpayKeyId: data.razorpayKeyId || "",
          razorpaySecret: data.razorpaySecret || "",
          active: data.active,
        });
      }

    } catch (e) {
      console.log(e);
    }
  };

  const onChange = (e) => {

    const { name, value, checked, type } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const onSave = async (e) => {

    e.preventDefault();

    try {

      if (exists) {
        await updatePaymentConfig(form);

        toast.success("Configuration Updated");
      } else {

        await addPaymentConfig(form);

        toast.success("Configuration Saved");

        setExists(true);
      }

    } catch (e) {

      console.log(e);

      toast.error("Operation Failed");
    }

  };

  return (
    <DashboardLayout
      brandLabel="Tavola for Restaurants"
      roleTag="Restaurant Owner"
      menu={OWNER_MENU}
    >

      <div className="dash-topbar">
        <div>
          <h1>Payment Configuration</h1>
          <p>Configure Razorpay credentials.</p>
        </div>
      </div>

      <div className="panel">

        <div className="panel-head">
          <h3>Razorpay</h3>
        </div>

        <form
          onSubmit={onSave}
          style={{ padding: 24 }}
        >

          <div className="field">
            <label>Razorpay Key ID</label>

            <input
              name="razorpayKeyId"
              value={form.razorpayKeyId}
              onChange={onChange}
            />
          </div>

          <div className="field">
            <label>Razorpay Secret</label>

            <input
              type="password"
              name="razorpaySecret"
              value={form.razorpaySecret}
              onChange={onChange}
            />
          </div>

          <div
            className="field"
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
            }}
          >

            <input
              type="checkbox"
              name="active"
              checked={form.active}
              onChange={onChange}
              style={{ width: "auto" }}
            />

            <label style={{ margin: 0 }}>
              Active
            </label>

          </div>

          <button
            className="btn-sm primary"
            type="submit"
          >
            {exists ? "Update Configuration" : "Save Configuration"}
          </button>

        </form>

      </div>

    </DashboardLayout>
  );
}