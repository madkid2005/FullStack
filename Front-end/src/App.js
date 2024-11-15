import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RegisterCustomer from './components/RegisterCustomer';
import Products from './components/Products';
import TypeBrand from './components/TypeBrand';
import BigBanner from './components/BigBanner';
import Categories from './components/Categories';
import ProductDetail from './components/ProductDatial';
import TakKharid from './components/TakKharid';
import ProductSale from './components/ProductSale';
import "./App.css"
import SmallBanner from './components/SmallBanner';
import DasteBandi from './components/DasteBandi';

function App() {

    return (
        <Router>
            <div className="App">
                <nav className=''>
                    <div className='d-none d-lg-block'>
                        <img
                            src="https://dkstatics-public.digikala.com/digikala-adservice-banners/57b10f5f0ada47b5fcb78d4e37f18f0b3e97102d_1731137869.gif?x-oss-process=image/format,webp"
                            alt="Banner"
                            className='w-100 ' />
                    </div>


                    <div className='container-fluid mt-2'>
                        <div className='row'>

                            <div className='col-lg-2'>
                                <TakKharid />



                            </div>

                            <div className='col-lg-5'>
                                <input
                                    className='w-100 border-0 input-search rounded-3'
                                    type="text"
                                    placeholder="جستجو"
                                />
                            </div>

                            <div className='col-lg-5 '>

                                <div className='text-end'>
                                    <Link to="/">Home</Link> |
                                    <Link to="/Products">Products</Link> |
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
                </Routes>
            </div>
        </Router>
    );
}

function Home() {
    return (
        <div >
            <Categories />
            <BigBanner />
            <ProductSale/>
            <TypeBrand />
            <SmallBanner />
            <DasteBandi/>
        </div>
    )
}

export default App;
