import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setIsSubmitting(true);
      await API.post("/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Registered successfully. Please login.");
      navigate("/login");
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || "Registration failed";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="auth-form-title">Register</h2>

      {error ? <p className="auth-form-error">{error}</p> : null}

      <input
        className="auth-form-input"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

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

      <button className="auth-form-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Register"}
      </button>
    </form>
  );
};

export default Register;