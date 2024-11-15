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
        <div className='container mt-5'>

            <div className='row'>

                {Dastebandis.map(DasteBandi => (
                    <div className='col-md-2 col-4' key={DasteBandi.id}>
                        <img className='rounded-5' src={DasteBandi.icon} alt='' />
                        <p className='text-center'>{DasteBandi.name} </p>

                    </div>
                ))}

            </div>
        </div>
    )
}
