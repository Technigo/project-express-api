import express from "express";
import cors from "cors";
import booksData from "./data/books.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

app.get('/books', (req, res) => {
  const titleQuery = req.query.title;

  if (!titleQuery) {
    return res.status(400).json({ error: "Title query parameter is required" });
  }

  const filteredBooks = booksData.filter(book =>
    book.title.toLowerCase().includes(titleQuery.toLowerCase())
  );

  if (filteredBooks.length === 0) {
    return res.status(404).json({ error: "No books found with the given title" });
  }

  res.json(filteredBooks);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

