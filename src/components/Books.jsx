/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "./apicalls/fetchbooks";
import "../assets/styles/Books.css";
import { fetchSingleBook } from "./apicalls/fetchsinglebook";

function Books() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBooks = async () => {
      const response = await fetchBooks();
      setBooks(response);
    };
    loadBooks();
  }, []);

  console.log(books);

  return (
    <div className="page-container">
      <h2 className="page-heading">Book Catalog</h2>
      <div className="card-container">
        {books.length === 0 ? (
          <p>Loading books...</p>
        ) : (
          books.map((book) => {
            return (
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
                <button type="button" onClick={() => navigate(`/books/${book.id}`)}>
                  {book.available ? "Details & Checkout" : "Details"}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
export default Books;
