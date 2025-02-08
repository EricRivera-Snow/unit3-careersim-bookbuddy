// === IMPORTS ===

// library imports
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// fetch imports
import { fetchSingleBook } from "./apicalls/fetchsinglebook";
import { fetchBooks } from "./apicalls/fetchbooks";
import { checkoutBook } from "./apicalls/checkoutbook";

//style imports
import "../assets/styles/SingleBook.css";

// === APP CODE ===

function SingleBook({ token }) {
  // function variables
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

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

  const clickHandleCheckout = async () => {
    const json = await checkoutBook(bookId, token);
    if (json) {
      alert("Check-out successful!");
      setBook((prev) => ({ ...prev, available: false }));
    }
  };

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
             <div className="button-box">
              
              <button type="button" onClick={() => navigate(`/account`)}>
                Visit Account Page
              </button>
              {book.available ? (
                <button type="button" onClick={clickHandleCheckout}>
                  Check-Out
                </button>
              ) : (
                "Not Available"
              )}
              </div>
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
