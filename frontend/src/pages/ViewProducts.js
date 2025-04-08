import { useEffect, useState } from "react";

const ViewProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/products/")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Error fetching products:", err));
    }, []);

    return (
        <div className="view-products-container">
            <h2>View Products</h2>
            <div className="products-grid">
                {products.map((product) => (
                    <div key={product._id} className="product-card">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <strong>Price:</strong> Rs.{product.price} <br />
                        <strong>Quantity:</strong> {product.quantity} <br />
                        <strong>Category:</strong> {product.category}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewProducts;
