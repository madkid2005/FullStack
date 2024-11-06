import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RegisterCustomer from './components/RegisterCustomer';

function App() {

    return (
        <Router>
            <div className="App">
                <nav className='position-fixed'>
                    <Link to="/">Home</Link> | 
                    <Link to="/register">Register</Link> | 

                </nav>
              
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<RegisterCustomer />} />
                   
                </Routes>
            </div>
        </Router>
    );
}

function Home() {
    return <h2>Welcome to the Home Page</h2>;
}

export default App;
