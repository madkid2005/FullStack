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
import ComplateProfile from "./components/ComplateProfile";
import RegisterSeller from "./components/RegisterSeller";
import DashboardCustomer from "./components/DashboardCustomer";


import { useEffect, useState } from 'react';

function App() {
    const [isSticky, setIsSticky] = useState(false);
    const [logout, setLogout] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const header = document.getElementById('sticky-header');
            const offsetTop = header.getBoundingClientRect().top;

            if (offsetTop <= 0) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('access_tokenJWT');
        if (token && token.length > 0) {
            setLogout(true);  // اگر توکن موجود باشد، یعنی کاربر وارد شده است
        } else {
            setLogout(false); // اگر توکن نباشد، یعنی کاربر خارج شده است
        }
    }, [logout]); // بررسی وضعیت توکن هنگام بارگذاری کامپوننت

    const handleLogout = async () => {
        const refreshToken = localStorage.getItem('refresh_tokenJWT'); // فرض بر این است که refresh_token در localStorage ذخیره شده است

        if (!refreshToken) {
            console.error("No refresh token found");
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/users/logout/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_tokenJWT')}`,
                    'X-API-KEY': "thisisapikeytoaccesstoapiendpoints999"
                },
                body: JSON.stringify({ refresh: refreshToken })
            });

            const data = await response.json();
            console.log(data);
            

            if (response.ok) {
                console.log(data.message);  // نمایش پیام موفقیت
                localStorage.removeItem('access_tokenJWT');  // حذف access token از localStorage
                localStorage.removeItem('refresh_tokenJWT');  // حذف refresh token از localStorage
                setLogout(false);  // به روز رسانی وضعیت logout
            } else {
                console.error(data.error);  // نمایش خطا در صورت وجود
            }
        } catch (error) {
            console.error('Logout failed:', error);  // نمایش خطای اتصال
        }
    };

    return (
        <Router>
            <div className="App">
                <nav className=''>
                    {/* BANNER TOP PAGE */}
                    <div className='d-none d-lg-block '>

                        <img
                            src="https://dkstatics-public.digikala.com/digikala-adservice-banners/57b10f5f0ada47b5fcb78d4e37f18f0b3e97102d_1731137869.gif?x-oss-process=image/format,webp"
                            alt="Banner"
                            className='w-100 ' />
                    </div>

                    {/* NAVBAR PART 1 */}
                    <div
                        id="sticky-header"
                        className={`container-fluid ${isSticky ? 'position-fixed top-0 shadow bg-white shadow z-3' : ''}`}
                    >
                        <div className='row'>

                            <div className='col-lg-2 col-sm-12 d-lg-flex text-center'>
                                <span className='d-block'>
                                    <Link to="/">
                                        <TakKharid />
                                    </Link>
                                </span>



                            </div>

                            <div className='col-lg-5 '>

                                <input
                                    className='w-100   border-0 input-search rounded-5 mt-2 mb-2'
                                    type="text"
                                    placeholder="جستجو"
                                />
                            </div>

                            <div className='col-lg-5 d-none d-lg-block'>

                                <div className='text-end mt-2'>
                                    {/* <Link to="/">Home</Link> |
                                    <Link to="/Products">Products</Link> | */}
                                    {logout ? (
                                        <button onClick={handleLogout} className="register-btn">
                                            <Link to="/" className="link-text h6">خروج</Link>

                                        </button>
                                    ) : (
                                        <button className="register-btn">

                                            <Link to="/register"className="link-text h6">ورود | ثبت نام</Link>
                                        </button>
                                    )}

                                    <span className='px-1'></span>
                                    <button className="register-btn ">
                                        <Link to="/register" className="link-text"><span className='bi bi-shop '></span></Link>
                                    </button>
                                </div>
                            </div>

                            <div className='row'>

                                <div className='col-lg-8 d-flex text-start '>
                                    <span className="ms-2 d mt-0 mb-0 d-flex align-items-center fw-bold">
                                        <span className='fw-bold d-lg-block d-none ' style={{ fontSize: '0.9rem' }}>
                                            <Categories />

                                        </span>
                                    </span>
                                    <span className="ms-3 mt-0 mb-0 d-flex align-items-center fw-bold">
                                        {/* <i className="bi bi-house fw-bold me-2 mt-1" style={{ fontSize: '1.3rem' }}></i> */}
                                        <span className='fw-bold d-lg-block d-none text-color1' style={{ fontSize: '0.9rem' }}>منو اصلی</span>
                                    </span>

                                    <span className="ms-3 mt-0 mb-0 d-flex align-items-center fw-bold">
                                        {/* <i className="bi bi-list fw-bold me-2 mt-1" style={{ fontSize: '1.4rem' }}></i> */}
                                        <span className='fw-bold d-lg-block d-none text-color1' style={{ fontSize: '0.9rem' }}>بلاگ</span>
                                    </span>

                                    <span className="ms-3 mt-0 mb-0 d-flex align-items-center fw-bold">
                                        {/* <i className="bi bi-list fw-bold me-2 mt-1" style={{ fontSize: '1.4rem' }}></i> */}
                                        <span className='fw-bold d-lg-block d-none text-color1' style={{ fontSize: '0.9rem' }}>پشتیبانی</span>
                                    </span>

                                    <span className="ms-3 mt-0 mb-0 d-flex align-items-center text-color1 fw-bold">
                                        {/* <i className="bi bi-list fw-bold me-2 mt-1" style={{ fontSize: '1.4rem' }}></i> */}
                                        <span className='text-color1'>
                                            <Link to="/RegisterSeller"  className="link-text text-color1 h6">ثبتنام فروشندگان</Link>
                                        </span>
                                    </span>

                                </div>
                                <div className='col-lg-4'></div>

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
                    <Route path="/RegisterSeller" element={<RegisterSeller />} />
                    <Route path="/DashboardCustomer" element={<DashboardCustomer />} />
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
            <Popularproducts />
            <SmallBanner />
            <Footer />
        </div>
    )
}

export default App;