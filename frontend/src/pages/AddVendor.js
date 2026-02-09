import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/addVendor.css";

export default function AddVendor() {
  const [form, setForm] = useState({ name: "", email: "", contact: "", location: "" });
  const [loading, setLoading] = useState(false);

  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/vendors/add", form);
      toast.success("Vendor added successfully!");
      setForm({ name: "", email: "", contact: "", location: "" });
    } catch (err) {
      toast.error(err.response?.data?.msg || "Error: " + err.message);
    } finally { setLoading(false); }
  };

  return (
    <div className="add-vendor-container">
      <h2>Add Vendor</h2>
      <form onSubmit={submit}>
        <p>Vendor Name:</p><input name="name" value={form.name} onChange={change} placeholder="Name" required/>
        <p>Vendor email:</p><input name="email" value={form.email} onChange={change} placeholder="Email"/>
        <p>Vendor contact:</p><input name="contact" value={form.contact} onChange={change} placeholder="Contact"/>
        <p>Vendor location:</p><input name="location" value={form.location} onChange={change} placeholder="Location"/>
        <button type="submit" disabled={loading}>{loading ? "Saving..." : "+ Add Vendor"}</button>
      </form>
    </div>
  );
}