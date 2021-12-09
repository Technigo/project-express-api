import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

// import booksData from "./data/books.json";
import booksAmazon from "./data/booksAmazon.json";

// Defines the port the app will run on. ¨
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/books", (req, res) => {
  const { title, author } = req.query;

  let bookInfo = booksAmazon;

  if (title) {
    bookInfo = bookInfo.filter(
      (item) => item.Name.toLowerCase().indexOf(title.toLowerCase()) !== -1
    );
  }

  if (author) {
    bookInfo = bookInfo.filter(
      (item) => item.Author.toLowerCase().indexOf(author.toLowerCase()) !== -1
    );
  }

  res.json({
    response: bookInfo,
    success: true,
  });
});

app.get("/books/authors/:author", (req, res) => {
  const { author } = req.params;

  const authorName = booksAmazon.filter(
    (item) => item.Author.toLowerCase() === author
  );

  if (!authorName) {
    res.status(404).json({
      response: "No author found with that name",
      success: false,
    });
  } else {
    res.status(200).json({
      response: authorName,
      success: true,
    });
  }
});

app.get("/books/year/:year", (req, res) => {
  const year = req.params.year;

  const bookByYear = booksAmazon.filter((item) => item.Year === +year);

  if (!bookByYear) {
    res.status(404).json({
      response: "There is no data for the selected year",
      success: false,
    });
  } else {
    res.status(200).json({
      response: bookByYear,
      success: true,
    });
  }
});

app.get("/books/genre/:genre", (req, res) => {
  const genre = req.params.genre;

  const bookByGenre = booksAmazon.filter(
    (item) => item.Genre.toLowerCase() === genre
  );

  if (!bookByGenre) {
    res.status(404).json({
      response: "There is no data for the selected genre",
      success: false,
    });
  } else {
    res.status(200).json({
      response: bookByGenre,
      success: true,
    });
  }
});

app.get("/books/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;

  const bookByIsbn = booksAmazon.filter((item) => item.Isbn === +isbn);

  if (!bookByIsbn) {
    res.status(404).json({
      response: "No book found with that info",
      success: false,
    });
  } else {
    res.status(200).json({
      response: bookByIsbn,
      success: true,
    });
  }
});

// app.get("books/name/:name"),
//   (req, res) => {
//     const { name } = req.params;

//     const bookName = booksAmazon.find((item) => item.Name === name);

//     if (!name) {
//       res.status(404).json({
//         response: "No book found with that name",
//         success: false,
//       });
//     } else {
//       res.status(200).json({
//         response: bookName,
//         success: true,
//       });
//     }
// };

app.get("/endpoints", (req, res) => {
  res.send(listEndpoints(app));
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
