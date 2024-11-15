import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductDetail() {
    const { id } = useParams(); // دریافت ID از URL
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/products/products/${id}/`)
            .then(response => setProduct(response.data))
            .catch(error => setError(error.message));
    }, [id]);

    if (error) {
        return <div>Error fetching product details: {error}</div>;
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-detail">
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} />
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
            <p>Average Rating: {product.average_rating}</p>
            <p>Total Ratings: {product.total_ratings}</p>
            <p>{product.in_sale ? `Sale Price: ${product.sale_price}` : 'Not in Sale'}</p>
            <p>Date Added: {new Date(product.date_added).toLocaleDateString()}</p>
        </div>
    );
}

export default ProductDetail;
