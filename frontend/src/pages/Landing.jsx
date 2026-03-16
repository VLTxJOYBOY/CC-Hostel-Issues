import { Link } from "react-router-dom";
import "../App.css";

const Landing = () => {
  return (
    <div className="landing">
      <div className="landing-card">
        <h1 className="landing-title">Hostel Issues</h1>
        <p className="landing-subtitle">
          Report hostel problems with a description and photo. Track updates as they
          get resolved.
        </p>

        <div className="landing-actions">
          <Link className="landing-button landing-button-primary" to="/login">
            Login
          </Link>
          <Link className="landing-button landing-button-secondary" to="/register">
            Register
          </Link>
        </div>

        <p className="landing-footer">
          After login you will be redirected to the feed.
        </p>
      </div>
    </div>
  );
};

export default Landing;
