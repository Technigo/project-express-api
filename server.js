import express from "express";
import cors from "cors";

import booksData from "./data/books.json";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/books", (req, res) => {
  const { author, title } = req.query;
  let dataToSend = booksData;

  if (author) {
    dataToSend = dataToSend.filter(
      (item) => item.authors.toLowerCase().indexOf(author.toLowerCase()) !== -1
    );
  }

  if (title) {
    dataToSend = dataToSend.filter(
      (item) => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1
    );
  }
  res.json({
    response: dataToSend,
    success: true,
  });
});

app.get("/book/:id", (req, res) => {
  const { id } = req.params;
  const book = booksData.find((item) => item.bookID === +id);

  if (!book) {
    res.status(404).send("Book with such a Id can not be found");
  }
  res.json(book);
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
