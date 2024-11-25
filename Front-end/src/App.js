import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RegisterCustomer from './components/RegisterCustomer';
import Products from './components/Products';
import TypeBrand from './components/TypeBrand';
import BigBanner from './components/BigBanner';
import Categories from './components/Categories';
import ProductDetail from './components/ProductDatial';
import "./App.css"
import SmallBanner from './components/SmallBanner';
import DasteBandi from './components/DasteBandi';
import TakKharid from './components/TakKharid';
import Footer from './components/Footers';
import Popularproducts from './components/Popularproducts';
import ComplateProfile from "./components/ComplateProfile"
import { useEffect, useState } from 'react';

function App() {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const header = document.getElementById('sticky-header');
            const offsetTop = header.getBoundingClientRect().top;

            // اگر دیو به بالای صفحه رسید
            if (offsetTop <= 0) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Router>
            <div className="App">
                <nav className=''>
                    <div className='d-none d-lg-block '>

                        <img
                            src="https://dkstatics-public.digikala.com/digikala-adservice-banners/57b10f5f0ada47b5fcb78d4e37f18f0b3e97102d_1731137869.gif?x-oss-process=image/format,webp"
                            alt="Banner"
                            className='w-100 ' />
                    </div>


                    <div
            id="sticky-header"
            className={`container-fluid ${isSticky ? 'position-fixed top-0 shadow bg-blue70 z-3' : 'bg-blue70'}`}
        >
                        <div className='row'>

                            <div className='col-lg-5 col-sm-12 d-lg-flex text-center'>
                                <span className='d-block'>
                                <Link to="/">
                                <TakKharid  />
                                </Link>
                                </span>
                                <span className="ms-2 d mt-0 mb-0 d-flex align-items-center fw-bold">
                                    <span className='fw-bold d-lg-block d-none' style={{ fontSize: '0.9rem' }}>
                                        <Categories />

                                    </span>
                                </span>
                                <span className="ms-3 mt-0 mb-0 d-flex align-items-center fw-bold">
                                    {/* <i className="bi bi-house fw-bold me-2 mt-1" style={{ fontSize: '1.3rem' }}></i> */}
                                    <span className='fw-bold d-lg-block d-none' style={{ fontSize: '0.9rem' }}>منو اصلی</span>
                                </span>

                                <span className="ms-3 mt-0 mb-0 d-flex align-items-center fw-bold">
                                    {/* <i className="bi bi-list fw-bold me-2 mt-1" style={{ fontSize: '1.4rem' }}></i> */}
                                    <span className='fw-bold d-lg-block d-none' style={{ fontSize: '0.9rem' }}>بلاگ</span>
                                </span>

                                <span className="ms-3 mt-0 mb-0 d-flex align-items-center fw-bold">
                                    {/* <i className="bi bi-list fw-bold me-2 mt-1" style={{ fontSize: '1.4rem' }}></i> */}
                                    <span className='fw-bold d-lg-block d-none' style={{ fontSize: '0.9rem' }}>پشتیبانی</span>
                                </span>


                            </div>
                            <div className='col-lg-1 '>

                            </div>
                            <div className='col-lg-4 '>

                                    <input
                                        className='w-100   border-0 input-search rounded-5 mt-2 mb-2'
                                        type="text"
                                        placeholder="جستجو"
                                    />
                            </div>

                            <div className='col-lg-2 d-none d-lg-block'>

                                <div className='text-end mt-2'>
                                    {/* <Link to="/">Home</Link> |
                                    <Link to="/Products">Products</Link> | */}
                                    <button className="register-btn ">
                                        <Link to="/register" className="link-text h6">ورود | ثبت نام</Link>
                                    </button>
                                    <span className='px-1'></span>
                                    <button className="register-btn ">
                                        <Link to="/register" className="link-text"><span className='bi bi-shop '></span></Link>
                                    </button>
                                </div>

                            </div>

                        </div>

                    </div>

                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<RegisterCustomer />} />
                    <Route path="/Products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/complateprofile" element={<ComplateProfile />} />
                </Routes>
            </div>
        </Router>
    );
}

function Home() {
    return (
        <div >
            <BigBanner />
            <DasteBandi />
            <TypeBrand />
            <Popularproducts/>
            <SmallBanner />
            <Footer/>
        </div>
    )
}

export default App;