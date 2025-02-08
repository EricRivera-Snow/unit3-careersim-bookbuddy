// === IMPORTS ===

// library imports
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// component imports
import NavBar from "./components/NavBar";

import Account from "./components/Account";
import Books from "./components/Books";
import Home from "./components/Home";
import Login from "./components/Login";
import Navigations from "./components/Navigations";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/Register";
import SingleBook from "./components/SingleBook";

// fetch imports

// image imports
import bookLogo from "./assets/books.png";

// styles imports
import "./assets/styles/pagestyles.css";

// === APP CODE ===

function App() {
  // function variables
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // function calls
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken !== token) {
      setToken(storedToken || null);
    }
  }, []);

  // page mockup
  return (
    <>
      <header className="header-container">
        <h1>
          <img id="logo-image" src={bookLogo} alt="Library Logo" />
          Library App
        </h1>
        <NavBar token={token} setToken={setToken} />
      </header>

      <Routes>
        <Route path="/" element={<Home token={token} setToken={setToken} />} />
        <Route element={<ProtectedRoute token={token} />}>
          <Route path="/account" element={<Account token={token} />} />
        </Route>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:bookId" element={<SingleBook token={token} />} />
      </Routes>
    </>
  );
}

export default App;
