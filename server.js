const express = require("express");
const app = express();
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const data = require("./data/books.json");

app.get("/", (req, res) => {
  const welcomeMessage =
    "Welcome to Book API!\n\n" +
    "Available Routes:\n" +
    "- /collection: Returns a collection of books, with optional filtering by author.\n" +
    "- /authors: Returns a collection of unique authors from the book data.\n" +
    "- /collection/:id: Returns a single book based on the provided book ID.";

  res.send(welcomeMessage);
});

app.get("/collection", (req, res) => {
  const { author } = req.query;

  console.log("Query Parameters:", req.query);

  let filteredData = data;

  if (author) {
    const lowerCaseAuthor = author.toLowerCase();
    filteredData = filteredData.filter((book) =>
      book.authors.some((authorName) =>
        authorName.toLowerCase().includes(lowerCaseAuthor)
      )
    );
  }

  console.log("Filtered Data:", filteredData);

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
