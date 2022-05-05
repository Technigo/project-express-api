import express from "express";
import cors from "cors";
import booksData from "./data/books.json";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to My Book Store📚");
});

app.get("/books", (req, res) => {
  const { limit, title } = req.query;

  let data = booksData;
  let success = true;
  let message = "";

  if (title) {
    data = booksData.filter(
      (book) => book.title.toLowerCase().search(title.toLowerCase()) !== -1
    );
  }

  if (limit) {
    const numLimit = Number(limit);
    if (numLimit < 0 || !Number.isInteger(numLimit)) {
      success = false;
      message = "Invalid limit value";
    } else {
      data = data.slice(0, numLimit);
    }
  }

  if (!data.length) {
    success = false;
    message = "No result found";
  }

  res.status(200).json({ data, success, message });
});

app.get("/books/:bookId", (req, res) => {
  const id = Number(req.params.bookId);

  let data = {};
  let success = true;
  let message = "";

  if (id < 0 || !Number.isInteger(id)) {
    res.status(404).json({ data, success: false, message: "Invalid bookId" });
  }

  data = booksData.find((book) => book.bookID === id);

  if (!data) {
    data = {};
    success = false;
    message = "No result found";
  }

  res.status(200).json({ data, success, message });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
