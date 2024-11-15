import React, { useState, useEffect } from 'react';
import "./ProductSale.css"
const ProductSlider = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetching data from your API
        fetch('http://127.0.0.1:8000/api/products/products/on-sale/')
            .then(response => response.json())
            .then(data => setProducts(data))  // Setting products in state
            .catch(error => console.error('Error fetching products:', error));  // Handling errors
    }, []); // The empty array means this useEffect runs only once when the component is mounted

    useEffect(() => {
        // Initialize Swiper after the component is mounted
        if (window.Swiper) {
            new window.Swiper('.swiper', {
                spaceBetween: 10, // Distance between slides
                slidesPerView: 4, // Number of slides visible at once
                navigation: true, // Enable navigation buttons
                breakpoints: {
                    640: {
                        slidesPerView: 2, // 2 slides on smaller screens
                    },
                    768: {
                        slidesPerView: 4, // 4 slides on medium screens
                    },
                    1024: {
                        slidesPerView: 8, // 8 slides on larger screens
                    },
                },
            });
        }
    }, [products]); // Re-run Swiper initialization when products are loaded

    return (
        <div className="container mt-5">
            <div className='row'>
                <div className='col-lg-2 bg-red'></div>
                <div className='col-lg-10  bg-danger'>

                    <div className="swiper ">
                        <div className="swiper-wrapper ">
                            {products.length > 0 ? (
                                products.map(product => (
                                    <div className="swiper-slide bg-white  " key={product.id}>
                                        <div className="product-card">
                                            <img className='img-fluid p-2' src={product.image || 'https://via.placeholder.com/150'} alt={product.name} />
                                            <p className='text-center'>{product.name}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>در حال بارگذاری...</p>
                            )}
                        </div>
                        <div className="swiper-pagination"></div>
                        <div className="swiper-button-next"></div>
                        <div className="swiper-button-prev"></div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductSlider;
