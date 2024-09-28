const express = require("express");
const expressListEndpoints = require("express-list-endpoints");
const app = express();
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const data = require("./data/books.json");

app.get("/", (req, res) => {
  const welcomeMessage =
    "<h1>Welcome to Book API!</h1>" +
    "<p>Available Routes:</p>" +
    "<ul>" +
    "<li><a href='/collection'>/collection</a>: Returns a collection of books, with optional filtering by author.</li>" +
    "<li><a href='/authors'>/authors</a>: Returns a collection of unique authors from the book data.</li>" +
    "<li><a href='/collection/:id'>/collection/:id</a>: Returns a single book based on the provided book ID.</li>" +
    "</ul>";

  res.send(welcomeMessage);
});

app.get("/collection", (req, res) => {
  const { author } = req.query;
  let filteredData = data;

  if (author) {
    const lowerCaseAuthor = author.toLowerCase();
    filteredData = filteredData.filter((book) =>
      book.authors.some((authorName) =>
        authorName.toLowerCase().includes(lowerCaseAuthor)
      )
    );
  }

  res.json(filteredData);
});

app.get("/authors", (req, res) => {
  const allAuthors = data.reduce((authors, book) => {
    return authors.concat(book.authors);
  }, []);

  const uniqueAuthors = [...new Set(allAuthors)];

  res.json(uniqueAuthors);
});

app.get("/collection/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = data.find((item) => item.bookID === itemId);

  if (!item) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.json(item);
});

app.get("/list-endpoints", (req, res) => {
  const endpoints = expressListEndpoints(app);
  res.json(endpoints);
});
