import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/orders.css";

export default function Orders() {
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ vendor: "", product: "", quantity: 0 });

  useEffect(() => {
    axios.get("http://localhost:5000/api/vendors/").then(r => setVendors(r.data));
    axios.get("http://localhost:5000/api/products/").then(r => setProducts(r.data));
  }, []);

  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/orders/add", form);
      toast.success("Order created successfully!");
      setForm({ vendor: "", product: "", quantity: 0 });
    } catch (err) {
      toast.error(err.response?.data?.msg || err.message);
    }
  };

  return (
    <div className="orders-container">
      <h2>Create Order</h2>
      <form onSubmit={submit}>
        <select name="vendor" value={form.vendor} onChange={change} required>
          <option value="">Select vendor</option>
          {vendors.map(v => <option key={v._id} value={v._id}>{v.name}</option>)}
        </select>

        <select name="product" value={form.product} onChange={change} required>
          <option value="">Select product</option>
          {products.map(p => <option key={p._id} value={p._id}>{p.name} - ₹{p.price}</option>)}
        </select>

        <input name="quantity" type="number" min="0" value={form.quantity} onChange={change} required/>
        <button type="submit">Allocate</button>
      </form>
    </div>
  );
}