/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSingleBook } from "./apicalls/fetchsinglebook";
import { fetchBooks } from "./apicalls/fetchbooks";
import { checkoutBook } from "./apicalls/checkoutbook";
import "../assets/styles/SingleBook.css";

function SingleBook({ token }) {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const loadBook = async () => {
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
    };
    loadBook();
  }, [bookId]);

  const handleCheckout = async () => {
    if (!token) {
      alert("You must be logged in to check out a book.");
      navigate("/login");
      return;
    }

    try {
      const response = await checkoutBook(bookId, token);
      if (response && response.success) {
        alert("Book checked out successfully!");
        setBook({ ...book, available: false });
      } else {
        alert("Failed to check out book.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while checking out the book.");
    }
  };

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
              <button type="button" onClick={handleCheckout}>
                {book.available ? "Check-Out" : "Check-In"}
              </button>
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
