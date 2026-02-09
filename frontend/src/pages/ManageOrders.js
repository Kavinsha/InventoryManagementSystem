import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/manageOrders.css";

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => { fetchOrders(); }, []);
  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:5000/api/orders/");
    setOrders(res.data);
  };

  const update = async (id, updates) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/update/${id}`, updates);
      toast.success("Order updated successfully!");
      fetchOrders();
    } catch (err) {
      toast.error(err.response?.data?.msg || err.message);
    }
  };

  return (
    <div className="manage-orders-container">
      <h2>Manage Orders</h2>
      <table>
        <thead><tr><th>Vendor</th><th>Product</th><th>Qty</th><th>Amount</th><th>Payment</th><th>Received</th><th>Actions</th></tr></thead>
        <tbody>
          {orders.map(o => (
            <tr key={o._id}>
              <td>{o.vendor?.name}</td>
              <td>{o.product?.name}</td>
              <td>{o.quantity}</td>
              <td>₹{o.amount}</td>
              <td>{o.paymentStatus}</td>
              <td>{o.received ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => update(o._id, { paymentStatus: o.paymentStatus === "paid" ? "pending" : "paid" })}>
                  Toggle Payment
                </button>
                <button onClick={() => update(o._id, { received: !o.received })}>
                  Toggle Received
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}