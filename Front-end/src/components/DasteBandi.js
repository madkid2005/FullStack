import React, { useEffect, useState } from 'react'

export default function DasteBandi() {
    const [Dastebandis, setDasteBandis] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/products/categories/")
            .then(res => res.json())
            .then(data => {
                setDasteBandis(data)
            })
    }, [])
    return (
        <div className='container-fluid mt-5'>

                <h4 className='text-center fw-bold'> دسته بندی</h4>
            <div className='row row-cols-6 text-center'>
                {Dastebandis.map(DasteBandi => (
                    <div className='col-1 m-2 bg-blue70 rounded-4' key={DasteBandi.id}>
                        <p className='text-center fw-bold mt-2'>{DasteBandi.name} </p>
                        <img className='img-fluid w-75' src={DasteBandi.icon} alt='' />

                    </div>
                ))}

                

            </div>
        </div>
    )
}