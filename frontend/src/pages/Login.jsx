import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setIsSubmitting(true);
      const res = await API.post("/api/auth/login", {
        email,
        password,
      });

      login(res.data.token);
      navigate("/feed");
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || "Login failed";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
          font-family:"Poppins",sans-serif;
        }

        .login-page{
          height:100vh;
          width:100%;
          display:flex;
          justify-content:center;
          align-items:center;
          background:linear-gradient(135deg,#667eea,#764ba2);
          padding:20px;
        }

        .auth-form{
          width:100%;
          max-width:380px;
          padding:40px 35px;
          border-radius:18px;
          backdrop-filter:blur(14px);
          background:rgba(255,255,255,0.1);
          border:1px solid rgba(255,255,255,0.2);
          box-shadow:0 20px 40px rgba(0,0,0,0.25);
          color:white;
          text-align:center;
          transition:0.3s;
        }

        .auth-form:hover{
          transform:translateY(-5px);
          box-shadow:0 25px 50px rgba(0,0,0,0.35);
        }

        .auth-form-title{
          font-size:30px;
          font-weight:700;
          margin-bottom:25px;
          letter-spacing:1px;
        }

        .auth-form-error{
          background:rgba(255,0,0,0.2);
          border:1px solid rgba(255,0,0,0.4);
          padding:8px;
          border-radius:8px;
          font-size:14px;
          margin-bottom:15px;
        }

        .auth-form-input{
          width:100%;
          padding:12px 14px;
          margin-bottom:16px;
          border-radius:10px;
          border:none;
          outline:none;
          font-size:14px;
          background:rgba(255,255,255,0.9);
        }

        .auth-form-input:focus{
          box-shadow:0 0 0 2px #ffffff80;
        }

        .auth-form-button{
          width:100%;
          padding:12px;
          border:none;
          border-radius:30px;
          font-size:15px;
          font-weight:600;
          background:white;
          color:#764ba2;
          cursor:pointer;
          transition:all 0.3s ease;
        }

        .auth-form-button:hover{
          transform:scale(1.04);
          background:#f2f2f2;
        }

        .auth-form-button:disabled{
          opacity:0.7;
          cursor:not-allowed;
        }

        @media(max-width:500px){
          .auth-form{
            padding:35px 25px;
          }

          .auth-form-title{
            font-size:26px;
          }
        }
      `}</style>

      <div className="login-page">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2 className="auth-form-title">Login</h2>

          {error ? <p className="auth-form-error">{error}</p> : null}

          <input
            className="auth-form-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="auth-form-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            className="auth-form-button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
