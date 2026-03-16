import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Hostel Issues
        </Link>
        <div className="navbar-links">
          {token ? (
            <>
              <Link to="/feed" className="navbar-link">
                Feed
              </Link>
              <button
                type="button"
                className="navbar-link navbar-link-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">
                Login
              </Link>
              <Link to="/register" className="navbar-link">
                Register
              </Link>
            </>
          )}
          {/* <Link to="/admin" className="navbar-link">
            Admin
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;