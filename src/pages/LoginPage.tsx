import React, { useState } from "react";
import { generateMagicLink } from "../api/AuthApi";
import "./LoginPage.css"; // Import the CSS file

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const handleLogin = async () => {
    try {
      setStatus("Sending magic link...");
      await generateMagicLink({
        email,
        baseUrl: "http://localhost:5173/",
        productName: "Image Creator",
        dateAndTime: formatDate(new Date()),
      });
      setStatus("Magic link sent! Check your email.");
    } catch (error) {
      setStatus("Error sending magic link." + error);
    }
  };

  return (
    <div className="login-page">
      <h1 className="login-title">Login</h1>
      <div className="input-container">
        <input
          type="email"
          placeholder="Enter email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <button onClick={handleLogin} className="login-button">
          →
        </button>
      </div>
      {status && <p className="status-message">{status}</p>}
    </div>
  );
};

export default LoginPage;
