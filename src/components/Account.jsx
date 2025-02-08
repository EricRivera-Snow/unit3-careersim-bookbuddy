import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchReservations } from "./apicalls/fetchreservations";
import "../assets/styles/Books.css";
// import { checkInBooks } from "./apicalls/checkinbooks";

function Account({ token }) {
  // ✅ Ensure token is received
  const navigate = useNavigate();
  const [reservedBooks, setReservedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login"); // ✅ Redirect unauthenticated users
      return;
    }

    const loadReservedBooks = async () => {
      try {
        const response = await fetchReservations(token);
        console.log("📥 API Response:", response);

        if (response && Array.isArray(response)) {
          setReservedBooks(response);
        } else {
          console.error("❌ Unexpected API Response:", response);
          setError("Failed to fetch reserved books.");
          setReservedBooks([]);
        }
      } catch (err) {
        console.error("❌ Error Fetching Reservations:", err);
        setError("An error occurred while loading reserved books.");
        setReservedBooks([]);
      } finally {
        setLoading(false);
      }
    };

    loadReservedBooks();
  }, [token, navigate]); // ✅ Added token to dependencies

  // const handleCheckIn = async (bookId) => {
  //   try {
  //     const response = await checkInBooks(bookId, token);
      
  //     if(response && response.success) {
  //       setReservedBooks((prevBooks) =>
  //       prevBooks.filter((book)=>book.id !== bookId))
  //     }

  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <div className="page-container">
      <h2 className="page-heading">Reserved Books</h2>

      {loading && <p>Loading books...</p>}
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
              {/* <button type="button" onClick={()=>handleCheckIn(book.id)}>Check-In</button> */}
              <button
                type="button"
                onClick={() => navigate(`/books/${book.id}`)}
              >
                {book.available ? "Details & Checkout" : "Details"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Account;
