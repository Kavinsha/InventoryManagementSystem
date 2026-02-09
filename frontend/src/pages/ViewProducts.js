import { useEffect, useState } from "react";
import "../styles/viewProducts.css";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // Filter products by search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="view-products-container">
      <h2>View Products</h2>
      
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search product by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <span className="search-count">{filteredProducts.length} products found</span>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product._id} className="product-card">
            <h3>{product.name}</h3>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Price:</strong> ₹{product.price}</p>
            <p><strong>Quantity:</strong> {product.quantity}</p>
            <p><strong>Category:</strong> {product.category}</p>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <p>No products found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default ViewProducts;
