import express from "express";
import cors from "cors";
import booksData from "./data/books.json";


// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8000;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Route 1: Main page
app.get("/", (req, res) => {
  res.send("📚 Hello and welcome to your digital library! 📚 Look for books at these endpoints: /books, books/id/:id, books/top-rated, /books/search?author=, /books/title/:title, books/lang/:lang");
});

//Route 2: All books data
app.get("/books", (req, res) => {
  res.json({booksData: booksData})
});

//Route 3: Finding a single book based on its id, example path: /books/book/3 
app.get('/books/book/:id', (req, res) => {
  const bookId = req.params.id
  const bookByID = booksData.find((item) => item.bookID === +bookId)
  if (bookByID) {
    res.json(bookByID);
  } else {
// If there is no book with the id, a 404 message is shown 
    res.status(404).send("Sorry, no book found by that ID 📚")
  }
})

//Route 4: Filtering out books with av average rating of 4 or more.
app.get('/books/top-rated', (req, res) => {
  const topRatedBooks = booksData.filter((item) => item.average_rating >= 4);

  res.json(topRatedBooks);
});

//Route 5: Search author, example path: /books/search?author=rowling
app.get("/books/search", (req, res) => {
  const author = req.query.author;
  const getAuthor = booksData.filter((item) => item.authors.toLowerCase().includes(author.toLowerCase())) 

  if (getAuthor.length === 0) {
    res.status(404).json("Sorry, could not find any books by that author name 📚")
  };

  res.json(getAuthor)
})

// Route 6: Get book by title, example path: /books/title/hamlet
app.get("/books/title/:title", (req, res) => {
  const title = req.params.title
  const getTitle= booksData.filter((item) => item.title.toLowerCase().includes(title.toLowerCase())) 

  res.json(getTitle)
});


//Route 7: Filter books by language code, example path: books/lang/eng
app.get("/books/lang/:lang", (req, res) => {
  const lang = req.params.lang
  const bookLanguage = booksData.filter((item) => item.language_code === lang);

  if (bookLanguage.length === 0) {
    res.status(404).json("Sorry, could not find any books on that language 📚")
  };

  res.json(bookLanguage)
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port} yeys`);

});
