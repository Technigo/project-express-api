import React, { useState, useEffect } from "react";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/books")
      .then((response) => response.json())
      .then((data) => setBooks(data.body.books));
  }, []);

  return (
    <div>
      {books.map((book) => (
        <div key={book.bookID}>
          <h2>{book.title}</h2>
          <h3>{book.authors}</h3>
          <p>{book.average_rating}</p>
        </div>
      ))}
    </div>
  );
};

export default Books;
