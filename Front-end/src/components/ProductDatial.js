import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ProductDetail.css'; // فایل استایل

function ProductDetail() {
    const { id } = useParams(); // دریافت ID از URL
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/products/products/${id}/`, {
                headers: {
                    'X-API-KEY': 'thisisapikeytoaccesstoapiendpoints999',
                },
            })
            .then((response) => setProduct(response.data))
            .catch((error) => setError(error.message));
    }, [id]);

    if (error) {
        return <div className="text-danger">Error fetching product details: {error}</div>;
    }

    if (!product) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="container-fluid product-detail-container">
            <div className="row">
                <div className="col-sm-12 col-md-4 product-detail-image">
                    <img className="img-fluid" src={product.image} alt={product.name} />
                </div>
                <div className="col-sm-12 col-md-8 product-detail-info">
                    <h2>{product.name}</h2>
                    <p>
                        <span>Description:</span> {product.description}
                    </p>
                    <p>
                        <span>Price:</span> ${product.price}
                    </p>
                    <p>
                        <span>Stock:</span> {product.stock}
                    </p>
                    <p>
                        <span>Average Rating:</span> {product.average_rating}
                    </p>
                    <p>
                        <span>Total Ratings:</span> {product.total_ratings}
                    </p>
                    <p className={product.in_sale ? 'sale-price' : ''}>
                        {product.in_sale ? `Sale Price: $${product.sale_price}` : 'Not in Sale'}
                    </p>
                    <p className="date-added">
                        <span>Date Added:</span> {new Date(product.date_added).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
