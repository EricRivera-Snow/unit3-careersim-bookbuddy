// === IMPORTS ===

// library imports
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// api/fetch imports
import { fetchReservations } from "./apicalls/fetchreservations";
import { checkInBooks } from "./apicalls/checkinbooks";

// style imports
import "../assets/styles/Books.css";

// === APP CODE ===

function Account({ token }) {
  // function variables
  const navigate = useNavigate();
  const [reservedBooks, setReservedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // function calls
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const loadReservedBooks = async () => {
      const json = await fetchReservations(token);
      setReservedBooks(json);
    };
    loadReservedBooks();
  }, [token, navigate]);

  const handleCheckIn = async (reservationId) => {
    const json = await checkInBooks(reservationId, token);
    if (json) {
      alert("Check-In Successful");
    }
    setReservedBooks((prev) =>
      prev.filter((book) => book.id !== reservationId)
    );
  };

  // page mockup

  return (
    <div className="page-container">
      <h2 className="page-heading">Reserved Books</h2>

      {error && <p className="error-message">{error}</p>}

      <div className="card-container">
        {reservedBooks.length === 0 && !loading && !error ? (
          <p>No reserved books found.</p>
        ) : (
          reservedBooks.map((book) => (
            <div key={book.id} className="card">
              <h3 className="card-component">{book.title}</h3>
              <img
                className="card-component"
                src={book.coverimage}
                alt={book.title}
              />
              <p className="card-component">Author: {book.author}</p>
              <p className="card-component">
                {book.available ? "Checked-In" : "Checked-Out"}
              </p>
              <div className="button-box">
              <button type="button" onClick={() => handleCheckIn(book.id)}>
                Check-In
              </button>
              <button
                type="button"
                onClick={() => navigate(`/books/${book.id}`)}
              >
                {book.available ? "Details & Checkout" : "Details"}
              </button>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Account;
