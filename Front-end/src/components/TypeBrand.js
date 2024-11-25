import React, { useEffect, useState } from 'react';

export default function TypeBrand() {
    const [Brands, setBrands] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/products/Brand/",{ headers: {
            'X-API-KEY' : "thisisapikeytoaccesstoapiendpoints999",
        },})
            .then(response => response.json())
            .then(data => {
                setBrands(data);
            });
    }, []);

    return (
        <div>
            <h4 className='text-center mt-5'>برندها</h4>
            
            <div className='container  mt-3'>
                <div className='row  row-sm-cols-2 row-cols-lg-8'>
                    {Brands.map((Brand) => (
                        <div className="col w-100" key={Brand.id}>
                            <img src={Brand.image_url} alt={Brand.name} className="w-100" />
                            <p className="text-center">{Brand.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
