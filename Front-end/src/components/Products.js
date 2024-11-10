import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Products.css"

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/products/products/')
            .then(response => setProducts(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className='container'>
            <div className='row row-cols-2 row-cols-md-2 row-cols-lg-6'>
                {products.map(product => (
                    <div className="col" key={product.id}>
                        <div className="product">
                            <img src={product.image_url} alt={product.name} className="product-image" />
                            <h2 className="product-name">{product.name}</h2>
                            <p className="product-description">{product.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
