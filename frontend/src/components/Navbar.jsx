import { Link } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Hostel Issues
        </Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Feed
          </Link>
          <Link to="/login" className="navbar-link">
            Login
          </Link>
          <Link to="/register" className="navbar-link">
            Register
          </Link>
          <Link to="/admin" className="navbar-link">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;