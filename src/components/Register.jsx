/* TODO - add your code to create a functional React component that renders a registration form */
import React, { useEffect, useState } from "react";
import "../assets/styles/Registration.css";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./apicalls/registeruser";

function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const user = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
    };

    try {
      const response = await registerUser(user);
      console.log("Registration Response: ", response);

      if (response && response.token) {
        localStorage.setItem("token", response.token);
        alert("User registration successful.");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        navigate("/account");
      } else {
        setError("User registration failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try Again.");
    }
  };

  return (
    <div>
      <h2>Registration Form</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            className="input-boxes"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last Name:
          <input
            className="input-boxes"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            className="input-boxes"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            className="input-boxes"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="registration-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
