import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/addProduct.css";

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
        category: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/products/add", formData);
            toast.success("Product Added Successfully"); 
            setFormData({ name: "", description: "", price: "", quantity: "", category: "" }); 
        } catch (error) {
            toast.error("Error Adding Product");
            console.error("Error:", error);
        }
    };

    return (
        <div className="add-product-container">
            <h2> Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
                <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
                <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
                <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
                <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
                <button type="submit">+ Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
