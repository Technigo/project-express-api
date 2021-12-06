import express from "express";
import cors from "cors";
import booksData from "./data/books.json";

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send(booksData);
});

app.get("/books", (req, res) => {
  const { author, title } = req.query;
  let filteredBooks = booksData;

  if (author) {
    filteredBooks.filter((item) =>
      item.authors.toLocaleLowerCase().includes(author.toLocaleLowerCase())
    );
  }
  if (title) {
    filteredBooks.filter((item) =>
      item.title.toLocaleLowerCase().includes(title.toLocaleLowerCase())
    );
  }

  if (filteredBooks.length === 0) {
    res.status(404).json("Sorry we couldn't find the book you're looking for!");
  } else {
    res.json(filteredBooks);
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
