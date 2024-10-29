import React, { useState, useEffect } from 'react';

function Products() {  // نام تابع با حرف بزرگ شروع شده
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/products/api/products/')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);  // برای بررسی داده‌های دریافت شده
                setProducts(data);
            })
            .catch((err) => setError(err));
    }, []);
    

    return (
        <div>
            {error ? <p style={{ color: 'red' }}>Error fetching products</p> : null}
            {products.map((product) => (
                <div key={product.id}>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                </div>
            ))}
        </div>
    );
}

export default Products;
