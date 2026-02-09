import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/manageProducts.css";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
  });

  // Fetch all products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products/");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Handle Update button click
  const handleUpdateClick = (product) => {
    setEditProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      category: product.category,
    });
    setShowModal(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle Update Submit
  const handleUpdateSubmit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/update/${editProduct._id}`,
        formData
      );

      if (response.status === 200) {
        toast.success("Product updated successfully!");
        setShowModal(false);
        fetchProducts(); // Refresh products list
        setEditProduct(null);
      }
    } catch (error) {
      toast.error("Error updating product: " + error.message);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    setConfirmAction(() => async () => {
      try {
        await fetch(`http://localhost:5000/api/products/delete/${id}`, {
          method: "DELETE",
        });
        toast.success("Product deleted successfully!");
        fetchProducts();
      } catch (error) {
        toast.error("Error deleting product: " + error.message);
      }
    });
    setShowConfirmDialog(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditProduct(null);
  };

  return (
    <div className="manage-products-container">
      <h2>Manage Products</h2>

      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>₹{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.category}</td>
              <td>
                <button
                  className="update-btn"
                  onClick={() => handleUpdateClick(product)}
                >
                  Update
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Popup */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Update Product</h3>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Product Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Product Name"
                />
              </div>

              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Product Description"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Price:</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Price"
                />
              </div>

              <div className="form-group">
                <label>Quantity:</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="Quantity"
                />
              </div>

              <div className="form-group">
                <label>Category:</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Product Category"
                />

              </div>
            </div>

            <div className="modal-footer">
              <button className="modal-cancel-btn" onClick={handleCloseModal}>
                Cancel
              </button>
              <button className="modal-ok-btn" onClick={handleUpdateSubmit}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="modal-overlay">
          <div className="confirmation-modal">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this product? This action cannot be undone.</p>
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
