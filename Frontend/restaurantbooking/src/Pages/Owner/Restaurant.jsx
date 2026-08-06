import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { OWNER_MENU } from "../../config/menus";
import { getRestaurant, updateRestaurant } from "../../api/apis";
import { toast } from "react-toastify";

export default function Restaurant() {
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    id: "",
    restaurantName: "",
    cuisineType: "",
    description: "",
    phone: "",
    email: "",
    openingTime: "",
    closingTime: "",
    image: "",
    imageFiles: [],
    address: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
    },
  });

  useEffect(() => {
    fetchRestaurant();
  }, []);

  const fetchRestaurant = async () => {
    try {
      const data = await getRestaurant();

      setForm({
        id: data.id,
        restaurantName: data.restaurantName || "",
        cuisineType: data.cuisineType || "",
        description: data.description || "",
        phone: data.phone || "",
        email: data.email || "",
        openingTime: data.openingTime || "",
        closingTime: data.closingTime || "",
        image: data.images?.length ? data.images[0] : "",
        imageFiles: [],
        address: {
          addressLine1: data.address?.addressLine1 || "",
          addressLine2: data.address?.addressLine2 || "",
          city: data.address?.city || "",
          state: data.address?.state || "",
          pincode: data.address?.pincode || "",
        },
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onAddressChange = (e) => {
    setForm((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const onImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    setForm((prev) => ({
      ...prev,
      image: URL.createObjectURL(files[0]),
      imageFiles: files,
    }));
  };

  const onSave = async (e) => {
  e.preventDefault();

  try {
    const restaurant = {
      restaurantName: form.restaurantName,
      description: form.description,
      phone: form.phone,
      email: form.email,
      cuisineType: form.cuisineType,
      openingTime: form.openingTime,
      closingTime: form.closingTime,
      address: form.address,
    };

    const formData = new FormData();

    formData.append("restaurant", JSON.stringify(restaurant));

    form.imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    const res = await updateRestaurant(form.id, formData);

    console.log("Update Response :", res);

    toast.success("Restaurant updated successfully 🎉");

    fetchRestaurant();
  } catch (err) {
    console.log(err);

    toast.error(
      err?.response?.data?.message || "Failed to update restaurant"
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
  }
    return (
    <DashboardLayout
      brandLabel="Tavola for Restaurants"
      roleTag="Restaurant Owner"
      menu={OWNER_MENU}
    >
      <div className="dash-topbar">
        <div>
          <h1>Restaurant Profile</h1>
          <p>Edit your restaurant details.</p>
        </div>
      </div>

      <div className="panel">
        <form onSubmit={onSave} style={{ padding: 24 }}>

          <div className="field">
            <label>Restaurant Image</label>

            {form.image && (
              <img
                src={form.image}
                alt="Restaurant"
                style={{
                  width: 250,
                  height: 170,
                  objectFit: "cover",
                  borderRadius: 10,
                  marginBottom: 15,
                  border: "1px solid #ddd",
                }}
              />
            )}

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={onImageChange}
            />
          </div>

          <div className="form-grid">

            <div className="field">
              <label>Restaurant Name</label>
              <input
                name="restaurantName"
                value={form.restaurantName}
                onChange={onChange}
              />
            </div>

            <div className="field">
              <label>Cuisine Type</label>
              <input
                name="cuisineType"
                value={form.cuisineType}
                onChange={onChange}
              />
            </div>

            <div className="field">
              <label>Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={onChange}
              />
            </div>

            <div className="field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
              />
            </div>

            <div className="field">
              <label>Address Line 1</label>
              <input
                name="addressLine1"
                value={form.address.addressLine1}
                onChange={onAddressChange}
              />
            </div>

            <div className="field">
              <label>Address Line 2</label>
              <input
                name="addressLine2"
                value={form.address.addressLine2}
                onChange={onAddressChange}
              />
            </div>

            <div className="field">
              <label>City</label>
              <input
                name="city"
                value={form.address.city}
                onChange={onAddressChange}
              />
            </div>

            <div className="field">
              <label>State</label>
              <input
                name="state"
                value={form.address.state}
                onChange={onAddressChange}
              />
            </div>

            <div className="field">
              <label>Pincode</label>
              <input
                name="pincode"
                value={form.address.pincode}
                onChange={onAddressChange}
              />
            </div>

            <div className="field">
              <label>Opening Time</label>
              <input
                type="time"
                name="openingTime"
                value={form.openingTime}
                onChange={onChange}
              />
            </div>

            <div className="field">
              <label>Closing Time</label>
              <input
                type="time"
                name="closingTime"
                value={form.closingTime}
                onChange={onChange}
              />
            </div>

          </div>

          <div className="field" style={{ marginTop: 20 }}>
            <label>Description</label>
            <textarea
              rows={5}
              name="description"
              value={form.description}
              onChange={onChange}
            />
          </div>

          <button
            className="btn-sm primary"
            type="submit"
            style={{ marginTop: 20 }}
          >
            Save Changes
          </button>

        </form>
      </div>
    </DashboardLayout>
  );
}