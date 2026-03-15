import { useState } from "react";
import API from "../services/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/auth/register", {
      name,
      email,
      password,
    });

    alert("Registered successfully");
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="auth-form-title">Register</h2>

      <input
        className="auth-form-input"
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

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
        Register
      </button>
    </form>
  );
};

export default Register;