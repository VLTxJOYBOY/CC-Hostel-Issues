import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await API.post("/auth/login", {
      email,
      password,
    });

    login(res.data.token);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="auth-form-title">Login</h2>

      <input
        className="auth-form-input"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="auth-form-input"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="auth-form-button" type="submit">
        Login
      </button>
    </form>
  );
};

export default Login;