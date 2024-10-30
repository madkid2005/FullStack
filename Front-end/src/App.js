import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Products from './components/Products';
import Dashboard from "./components/Dashboard";
import RegisterSeller from "./components/RegisterSeller";


function App() {

    return (
        <Router>
            <div className="App">
                <nav className='position-fixed'>
                    <Link to="/">Home</Link> | 
                    <Link to="/register">Register</Link> | 
                    <Link to="/login">Login</Link> |
                    <Link to="/RegisterSeller">RegisterSeller</Link> |
                </nav>
              
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path="/RegisterSeller" element={<RegisterSeller />} />
                </Routes>
            </div>
        </Router>
    );
}

function Home() {
    return <h2>Welcome to the Home Page</h2>;
}

export default App;
