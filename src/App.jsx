import { useState } from "react";
import bookLogo from "./assets/books.png";
import { Router, Routes, Route } from "react-router-dom";
import Account from "./components/Account";
import Books from "./components/Books";
import Login from "./components/Login";
import Navigations from "./components/Navigations";
import Register from "./components/Register";
import SingleBook from "./components/SingleBook";

function App() {
  const [token, setToken] = useState(null);

  return (
    <>
      <h1>
        <img id="logo-image" src={bookLogo} />
        Library App
      </h1>

        <Routes>
          <Route
            path="/"
            element={<Navigations token={token} setToken={setToken} />}
          />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account token={token} />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:bookId" element={<SingleBook />} />
        </Routes>
    </>
  );
}

export default App;
