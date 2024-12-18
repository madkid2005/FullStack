import React, { useState, useEffect } from "react";
import ProductSale from "./ProductSale";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; // تغییر این خط
import "swiper/css";
import "swiper/css/navigation";
import "./Popularproducts.css"
function MultiRowSlider() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/products/products/",{ headers: {
            'X-API-KEY' : "thisisapikeytoaccesstoapiendpoints999",
        },})
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    return (
        <div style={{ width: "100%", padding: "20px" }}>
            {/* دکمه‌های کنترلی */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                }}
            >
                <button
                    id="prevButton"
                    style={{
                        padding: "10px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    قبلی
                </button>
                <button
                    id="nextButton"
                    style={{
                        padding: "10px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    بعدی
                </button>
            </div>

            {/* اسلایدر */}
            <Swiper
                slidesPerView={1}
                spaceBetween={20}
                navigation={{
                    prevEl: "#prevButton",
                    nextEl: "#nextButton",
                }}
                modules={[Navigation]} // اضافه کردن ماژول Navigation
            >
                {/* هر اسلاید شامل 6 آیتم */}
                {Array.from({ length: Math.ceil(products.length / 6) }).map(
                    (_, slideIndex) => (
                        <SwiperSlide key={slideIndex}>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3, 1fr)",
                                    gridGap: "20px",
                                }}
                            >
                                {products
                                    .slice(slideIndex * 6, slideIndex * 6 + 6)
                                    .map((product) => (
                                        <div
                                            key={product.id}
                                            className="product-card"
                                        >
                                            <img
                                                src={product.image}
                                                alt={`Product ${product.id}`}
                                            />
                                            <button className="buy-button">
                                                خرید
                                            </button>
                                        </div>
                                    ))}
                            </div>
                        </SwiperSlide>
                    )
                )}
            </Swiper>
        </div>
    );
}



export default function Popularproducts() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-9 col-sm-12">
                    <div className="shadow rounded-4 p-2">
                        <h4 className="text-center bi bi-percent">محصولات پر طرفدار </h4>
                    </div>
                        <MultiRowSlider />
                </div>
                <div className="col-lg-3 col-sm-12">
                <div className="shadow rounded-4 p-2">
                        <h4 className="text-center bi bi-percent">تخفیفات </h4>
                    </div>
                    <div className="mt-3">
                        <ProductSale />
                        <div className="bg-blue70">
          <p>22:33</p>
      </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
