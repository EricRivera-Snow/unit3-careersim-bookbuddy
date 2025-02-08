// === IMPORTS ===
// import from library
import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

// === PROTECTED ROUTE CODE ===

function ProtectedRoute() {
  // function variables
  const [token, setToken] = useState(localStorage.getItem("token"));

  // function calls
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  console.log("ProtectedRoute Token:", token);

  return token ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
