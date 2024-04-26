import express from "express";
import cors from "cors";
import booksData from "./data/books.json";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  const endpoints = [
    { path: "/", methods: ["GET"], middlewares: ["anonymous"] },
    { path: "/books", methods: ["GET"], middlewares: ["anonymous"] },
    { path: "/books/:id", methods: ["GET"], middlewares: ["anonymous"] },
  ];
  res.json(endpoints);
});

app.get("/books", (req, res) => {
  res.json(booksData);
});

app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const book = booksData.find((book) => book.bookID === parseInt(bookId));

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


