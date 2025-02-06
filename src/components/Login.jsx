/* TODO - add your code to create a functional React component that renders a login form */
import React, { useState } from "react";
import "../assets/styles/Login.css";
import { useParams, useNavigate } from "react-router-dom";
import { logInUser } from "./apicalls/loginuser";

function Login({ setToken }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const user = {
      email: email,
      password: password,
    };

    try {
      const response = await logInUser(user);
      console.log("Login Response: ", response);

      if (response && response.token) {
        localStorage.setItem("token", response.token);
        setToken(response.token);
        alert("User login successful.");
        setEmail("");
        setPassword("");
        navigate("/account");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try Again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            className="input-boxes-login"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            className="input-boxes-login"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="login-button" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
