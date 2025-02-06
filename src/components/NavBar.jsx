import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/NavBar.css";

function NavBar({ token, setToken }) {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }

  // ✅ Debugging: Ensure token updates in NavBar
  useEffect(() => {
    console.log("Token in NavBar:", token);
  }, [token]);

  console.log(token);

  return (
    <div>
      <nav>
        <Link className="nav-links" to="/">
          Home
        </Link>
        <Link className="nav-links" to="/books">
          Books
        </Link>
        <Link className="nav-links" to="/books/id">
          Single Book
        </Link>
        {!token && (
          <>
            <Link className="nav-links" to="/register">
              Register
            </Link>
            <Link className="nav-links" to="/login">
              Login
            </Link>
          </>
        )}

        {token && (
          <Link className="nav-links" to="/account">
            Account
          </Link>
        )}
        {token && <button onClick={handleLogout}>Logout</button>}
      </nav>
    </div>
  );
}

export default NavBar;
