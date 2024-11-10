import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RegisterCustomer from './components/RegisterCustomer';
import Products from './components/Products';
import TypeProduct from './components/Brand';
import BigBanner from './components/BigBanner';
import "./App.css"
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


                    <div className='container mt-2'>
                        <div className='row'>

                            <div className='col-lg-1'>

                            </div>

                            <div className='col-lg-6'>
                                <input
                                    className='w-100 border-0 input-search rounded-3'
                                    type="text"
                                    placeholder="جستجو"
                                />
                            </div>

                            <div className='col-lg-5 '>
                                <button className="register-btn">
                                    <Link to="/register" className="link-text">ورود | ثبت نام</Link>
                                </button>

                            </div>

                        </div>

                    </div>
                    <Link to="/">Home</Link> |
                    <Link to="/Products">Products</Link> |

                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<RegisterCustomer />} />
                    <Route path="/Products" element={<Products />} />

                </Routes>
            </div>
        </Router>
    );
}

function Home() {
    return (
        <div >
            <BigBanner/>
            <TypeProduct/>
        </div>
    )
}

export default App;
