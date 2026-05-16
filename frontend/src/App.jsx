import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Shortlist from './pages/Shortlist';

function Navbar() {
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <div>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h2 className="gradient-text" style={{ margin: 0, fontSize: '1.5rem' }}>AI Shortlister</h2>
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Candidates</Link>
        <Link to="/shortlist" className={`nav-link ${location.pathname === '/shortlist' ? 'active' : ''}`}>Match Jobs</Link>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shortlist" element={<Shortlist />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
