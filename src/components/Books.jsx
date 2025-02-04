/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import React, { useEffect, useState } from "react";
import { fetchBooks } from "./apicalls/fetchbooks";

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const loadBooks = async () => {
      const response = await fetchBooks();
      setBooks(response);
    };
    loadBooks();
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-heading">Books</h1>
      <div className="card-container">
        {books.map((book) => {
          <div className="card">
            <h2>Title: {book.title}</h2>
            <img src={book.coverimage} alt={book.title} />
            <p>Author: {book.author}</p>
            <p>Availability: {book.available === true ? "Checked-In" : "Checked-Out"}</p>
          </div>;
        })}
      </div>
    </div>
  );
}
export default Books;
