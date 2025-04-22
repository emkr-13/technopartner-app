import { useState } from "react";
import { useAuth } from "../utils/authContext";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error

    try {
      await login();
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid credentials");
    }
  };

  return (
    <div className="container">
      <img
        src="/assets/logo-techno.png"
        alt="Technopartner Logo"
        className="logo"
      />

      <form onSubmit={handleSubmit} className="form">
        {error && <div className="error">{error}</div>}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
