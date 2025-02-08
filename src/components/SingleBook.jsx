// === IMPORTS ===

// library imports
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// fetch imports
import { fetchSingleBook } from "./apicalls/fetchsinglebook";
import { fetchBooks } from "./apicalls/fetchbooks";
import { checkoutBook } from "./apicalls/checkoutbook";
import { checkInBooks } from "./apicalls/checkinbooks";

//style imports
import "../assets/styles/SingleBook.css";

// === APP CODE ===

function SingleBook({ token }) {
  // function variables
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // function calls
  useEffect(() => {
    const loadBook = async () => {
      try {
        if (Number(bookId)) {
          const response = await fetchSingleBook(Number(bookId));
          setBook(response);
          console.log(response);
        } else {
          const response = await fetchBooks();
          if (response.length > 0) {
            setBook(response[0]);
            navigate(`/books/${response[0].id}`);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadBook();
  }, [bookId]);

  // const handleCheckout = async () => {
  //   if (!token) {
  //     alert("You must be logged in to check out a book.");
  //     navigate("/login");
  //     return;
  //   }

  //   try {
  //     const response = await checkoutBook(bookId, token);
  //     if (response && response.success) {
  //       alert("Book checked out successfully!");
  //       setBook({ ...book, available: false });
  //     } else {
  //       alert("Failed to check out book.");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert("An error occurred while checking out the book.");
  //   }
  // };

  // const handleCheckIn = async () => {
  //   if (!token) {
  //     alert("You must be logged in to check out a book.");
  //     navigate("/login");
  //     return;
  //   }

  //   try {
  //     const response = await checkInBooks(bookId, token);
  //     if (response && response.success) {
  //       alert("Book checked in successfully!");
  //       setBook({ ...book, available: true });
  //     } else {
  //       alert("Failed to check out book.");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert("An error occurred while checking out the book.");
  //   }
  // };

  // page mockup
  return (
    <div>
      {book ? (
        <div className="page-container">
          <h2 className="page-heading">Book Details</h2>
          <div className="card-container">
            <div className="card">
              <h3 className="card-component">{book.title}</h3>
              <img src={book.coverimage} alt={book.title} />
              <p className="card-component">Author: {book.author}</p>
              <p className="card-component">
                {book.available ? "Checked-In" : "Checked-Out"}
              </p>
              <p className="card-component">{book.description}</p>
              <button type="button" onClick={() => navigate(`/account`)}>
                Visit Account Page to{" "}
                {!book.available ? "Check-In" : "Check-Out"}
              </button>
              {/* <div className="button-box">
                <button
                  className="check-buttons"
                  type="button"
                  onClick={handleCheckIn}
                >
                  Check-In
                </button>
                <button
                  className="check-buttons"
                  type="button"
                  onClick={handleCheckout}
                >
                  Check-Out
                </button>
              </div> */}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading book...</p>
      )}
    </div>
  );
}

export default SingleBook;
