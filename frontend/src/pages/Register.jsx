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
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />

      <br />

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

      <br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;