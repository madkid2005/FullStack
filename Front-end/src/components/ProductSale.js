
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";

export default function ProductSale() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/products/on-sale/",{ headers: {
      'X-API-KEY' : "thisisapikeytoaccesstoapiendpoints999",
  },})
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (products.length === 0) {
    return <div>No products on sale</div>;
  }

  return (
    <div style={{ height: "500px", width: "300px", overflow: "hidden" }}>
      <Swiper
        direction="vertical"
        slidesPerView={2}
        spaceBetween={20}
        scrollbar={{
          draggable: true,
        }}
        style={{ height: "100%" }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="bg-blue70"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                height: "220px", // ارتفاع هر اسلاید
                borderRadius: "8px",
                padding: "10px",
                textAlign: "center",
              }}
            >
              {/* نام محصول */}
              <h4 style={{ marginBottom: "10px", fontSize: "16px" }}>
                {product.name || "نام محصول"}
              </h4>

              {/* عکس محصول */}
              <img
                src={product.image}
                alt={`Product ${product.id}`}
                style={{
                  maxWidth: "80%",
                  maxHeight: "80px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                }}
              />

              {/* دکمه خرید */}
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                خرید
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
     
    </div>
    
  );
}
