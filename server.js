import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import booksData from "./data/books.json";

const port = process.env.PORT || 8080;
const app = express();

// Middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/books", (req, res) => {
  res.json(booksData);
});

app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const book = booksData.find(item => item.bookID.toString() === bookId);
  res.json(book);
});

app.get("/language/:language", (req, res) => {
  const language = req.params.language;
  const booksInLanguage = booksData.filter(item => item.language_code === language);
  res.json(booksInLanguage);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
