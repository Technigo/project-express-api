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
  res.send("Hello Emmy!");
});

app.get(`/title`, (req, res) => {
  res.json(booksData);
});

app.get(`/rating/:average_rating`, (req, res) => {
  const requestedRating = req.params.average_rating;
  const showRating = req.query.showRating === "true";
  let filteredBooks = booksData.filter(
    (item) => item.average_rating === +requestedRating
  );

  if (showRating) {
    filteredBooks = filteredBooks.filter(
      (item) => item.average_rating === +requestedRating
    );
  }

  res.json(filteredBooks);
});

app.get(`/language/:language_code`, (req, res) => {
  const language = req.query.language_code;
  const showLanguage = req.query.showLanguage === "true";

  if (!language) {
    // Handle the case where the language parameter is missing
    return res.status(400).json({ error: "Language code is missing" });
  }

  let filteredBooks = booksData.filter(
    (item) => item.language_code === language
  );

  if (showLanguage) {
  }

  res.json(filteredBooks);
});

app.get(`/author/:authors`, (req, res) => {
  const findAuthorLastName = req.params.authors;

  // Use the find() function to search for an author with the specified last name
  const foundAuthor = booksData.find((item) => {
    const authorNames = item.authors.split(" ");
    const authorLastName = authorNames[authorNames.length - 1];
    return authorLastName === findAuthorLastName;
  });

  if (foundAuthor) {
    res.json(foundAuthor);
  } else {
    res.status(404).json({ error: "Author not found" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
