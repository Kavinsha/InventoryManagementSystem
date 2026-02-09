import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/manageVendors.css";

export default function ManageVendors() {
  const [vendors, setVendors] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", contact: "", location: "" });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => { fetchVendors(); }, []);
  const fetchVendors = async () => {
    const res = await axios.get("http://localhost:5000/api/vendors/");
    setVendors(res.data);
  };

  const startEdit = v => { setEditing(v); setForm({ name: v.name, email: v.email, contact: v.contact, location: v.location }); };
  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

  const save = async () => {
    try {
      await axios.put(`http://localhost:5000/api/vendors/update/${editing._id}`, form);
      toast.success("Vendor updated successfully!");
      setEditing(null);
      fetchVendors();
    } catch (err) {
      toast.error(err.response?.data?.msg || err.message);
    }
  };

  const remove = async (id) => {
    setConfirmAction(() => async () => {
      try {
        await axios.delete(`http://localhost:5000/api/vendors/delete/${id}`);
        toast.success("Vendor deleted successfully!");
        fetchVendors();
      } catch (err) {
        toast.error(err.response?.data?.msg || err.message);
      }
    });
    setShowConfirmDialog(true);
  };

  return (
    <div className="manage-vendors-container">
      <h2>Manage Vendors</h2>
      <table>
        <thead><tr><th>Name</th><th>Email</th><th>Contact</th><th>Location</th><th>Actions</th></tr></thead>
        <tbody>
          {vendors.map(v => (
            <tr key={v._id}>
              <td>{v.name}</td><td>{v.email}</td><td>{v.contact}</td><td>{v.location}</td>
              <td>
                <button onClick={() => startEdit(v)}>Edit</button>
                <button onClick={() => remove(v._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Vendor</h3>
            <input name="name" value={form.name} onChange={change}/>
            <input name="email" value={form.email} onChange={change}/>
            <input name="contact" value={form.contact} onChange={change}/>
            <input name="location" value={form.location} onChange={change}/>
            <button onClick={() => { save(); }}>Save</button>
            <button onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="modal-overlay">
          <div className="confirmation-modal">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this vendor? This action cannot be undone.</p>
            <div className="confirmation-buttons">
              <button 
                className="confirm-cancel-btn" 
                onClick={() => setShowConfirmDialog(false)}
              >
                Cancel
              </button>
              <button 
                className="confirm-delete-btn" 
                onClick={async () => {
                  setShowConfirmDialog(false);
                  if (confirmAction) await confirmAction();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}