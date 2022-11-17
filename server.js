import express from "express";
import cors from "cors";
import booksData from "./data/books.json";
import listEndpoints from "express-list-endpoints";


// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Lists the endpoints for all routers that is created in this file. 
app.get("/endpoints", (req, res) => {
  res.send(listEndpoints(app))
})


app.get("/", (req, res) => {
  res.send({
    Message: "📚 Hello and welcome to your digital library! 📚 Look for books at these endpoints:",
    Routes: [
      {
        "/books": "Show all books (450) data.",
        "/books/book/:id": "Show a single book based on its id.",
        "/books/top-rated": "Show books with an average rating of 4 or more.",
        "/books/search?author=": "Show books by author search.",
        "/books/title/:title": "Show books by title.",
        "/books/lang/:lang":"Show books by language",
      },
    ]});
});

// All books data
app.get("/books", (req, res) => {
  res.json({booksData: booksData})
  {pagination}
});

// Finding a single book based on its id, example path: /books/book/3 
app.get('/books/book/:id', (req, res) => {
  const bookId = req.params.id
  const bookByID = booksData.find((item) => item.bookID === +bookId)
  if (bookByID) {
    res.status(200).json(bookByID);
  } else {
// If there is no book with the id, a 404 message is shown 
    res.status(404).send({
    message: "Sorry, no book found by that ID 📚",
    error: 404})
  }
})

// Filtering out books with av average rating of 4 or more.
app.get('/books/top-rated', (req, res) => {
  const topRatedBooks = booksData.filter((item) => item.average_rating >= 4);

  res.status(200).json(topRatedBooks);
});

// Search author, example path: /books/search?author=rowling
app.get("/books/search", (req, res) => {
  const author = req.query.author;
  const getAuthor = booksData.filter((item) => item.authors.toLocaleLowerCase().includes(author.toLocaleLowerCase())) 

  if (getAuthor.length === 0) {
    res.status(404).send({
    message: "Sorry, could not find any books by that author name 📚",
    error: 404})
  };

  res.status(200).json(getAuthor)
})

// Get book by title, example path: /books/title/hamlet
app.get("/books/title/:title", (req, res) => {
  const title = req.params.title
  const getTitle= booksData.filter((item) => item.title.toLocaleLowerCase().includes(title.toLocaleLowerCase())) 

  if (getTitle.length === 0) {
    res.status(404).send({
    message: "Sorry, could not find any books by that title 📚",
    error: 404})
  };

  res.status(200).json(getTitle)
});


// Filter books by language code, example path: books/lang/eng
app.get("/books/lang/:lang", (req, res) => {
  const lang = req.params.lang
  const bookLanguage = booksData.filter((item) => item.language_code === lang);

  if (bookLanguage.length === 0) {
    res.status(404).send({
      message: "Sorry, could not find any books on that language 📚",
      error: 404})
  };

  res.status(200).json(bookLanguage)
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
