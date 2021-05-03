import express from "express";
import booksData from "./data/books.json";

const port = process.env.PORT || 8082;
const app = express();

// endpoint to get all books
app.get("/books", (req, res) => {
  res.json(booksData);
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
