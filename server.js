import express from "express";
import cors from "cors";
import booksData from "./data/books.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden when starting the server. Example command to overwrite PORT env variable value: PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});


//ROUTE PARAMETERS//

// FIND each book by title
//This had to be before find by ID in order to work
//URL: /books/TitleOfBook
app.get('/books/:title', (req, res) => {
  const requestedTitle = req.params.title.replace(/%20/g, ' ');
  const bookWithTitle = booksData.find((book) => book.title === requestedTitle);
  if (bookWithTitle) {
    res.json(bookWithTitle);
  } else {
    res.status(404).send("No book was found");
  }
});

//FIND each book by ID
//URL: /books/bookID (number of book ID)
app.get('/books/:bookID', (req, res) => {
  const bookID = req.params.bookID
  const singleBook = booksData.find((book) => book.bookID === +bookID)
  console.log('bookID', bookID, typeof bookID)
  if (singleBook) {
    res.json(singleBook)
  } else {
    res.status(404).send("No book was found")
  }
})


//QUERY PARAMETERS//
//Reminder: Query is shown in url after the "?"

// FILTER books by author
//URL: /books?author=AuthorName
app.get('/books', (req, res) => {
  const authorName = req.query.author;
  if (!authorName) {
    return res.status(400).send('Author not found');
  }
  const lowercasedAuthorName = authorName.toLowerCase();//To make sure the author is uncluded even if the name should be spelled with different casing
  const booksByAuthor = booksData.filter((book) =>
    book.authors.toLowerCase().includes(lowercasedAuthorName)
  );
  res.json(booksByAuthor);
});

/*TRIED THE SLICE METHOD, BUT DID NOT MAKE IT WORK :(
// SLICE for getting top books by average rating
// URL: books/top?count=5 (can change number)
app.get('/books/top', (req, res) => {
  const count = parseInt(req.query.count, 10);
  console.log('count:', count);

  // Sort books by average rating in descending order and slice to get the top books
  const topBooks = booksData
    .sort((a, b) => b.average_rating - a.average_rating) //Sort books sorted in descending order
    .slice(0, count); //The slice method is used to get the top books according to the specified count in url
  console.log('topBooks:', topBooks);
  // Return 
  res.json(topBooks);
});*/

//ROUTE PARAMETER//
//Get all books
//URL: /books
app.get('/books', (req, res) => {
  res.json(booksData)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

