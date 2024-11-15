import React from 'react'

export default function BigBanner() {
    return (
        <div className=''>
            <div id="carouselExampleRide" class="carousel slide" data-bs-ride="true">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="https://dkstatics-public.digikala.com/digikala-adservice-banners/6ebdfc4c47a80fc8904126321923585e3a95764b_1731219869.jpg?x-oss-process=image/quality,q_95/format,webp" class="d-block w-100" alt="..."/>
                    </div>
                    <div class="carousel-item">
                        <img src="https://dkstatics-public.digikala.com/digikala-adservice-banners/a6ea213652700c1a6107e2aea06c3fb8cf69402b_1731164703.gif?x-oss-process=image?x-oss-process=image/format,webp" class="d-block w-100" alt="..."/>
                    </div>
                    <div class="carousel-item">
                        <img src="https://dkstatics-public.digikala.com/digikala-adservice-banners/ca036d856caf51e1556dcef58d2ba0854ec40a78_1724138391.gif?x-oss-process=image?x-oss-process=image/format,webp" class="d-block w-100" alt="..."/>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}
