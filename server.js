import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// My choosen dataset
import books from './data/books.json';

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:

//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello, welcome to Gabriella´s API with books! Possible endpoints to use: /books (for seeing all books), /books/book/:id, (to search by Book ID) /books/author/:author (to search by author) and /books/top-rated (to see the 20 highest rated books)')
});

// The first endpoint, returns a collection of books
app.get('/books', (req, res) => {
  res.json(books)
});

// Filter query
app.get('/books/filter', (req, res) => {
  // Slice to set the 50 first books
  let filteredBooks = books.slice(0, 50);
  
  // Set a filter with query parameter to filter on
  // only the books with average_rating > 4.0
  // Access this query by '/books?average_rating=high'
  const { average_rating, page } = req.query;
  if (average_rating === 'high') {
    filteredBooks = filteredBooks.filter((item) => item.average_rating > 4.0);
  };
  
  // Set query for which site to see, with 50 on each.
  // Total 500 books divided on 10 pages
  if (page === '1') {
    filteredBooks = books.slice(0, 50)
  } else if (page === '2') {
    filteredBooks = books.slice(51, 100)
  } else if (page === '3') {
    filteredBooks = books.slice(101, 150)
  } else if (page === '4') {
    filteredBooks = books.slice(151, 200)
  } else if (page === '5') {
    filteredBooks = books.slice(201, 250)
  } else if (page === '6') {
    filteredBooks = books.slice(251, 300)
  } else if (page === '7') {
    filteredBooks = books.slice(301, 350)
  } else if (page === '8') {
    filteredBooks = books.slice(351, 400)
  } else if (page === '9') {
    filteredBooks = books.slice(401, 450)
  } else if (page === '10') {
    filteredBooks = books.slice(451, 500)
  }

  res.json(filteredBooks)
});

// The second endpoint, returns a single book based on bookID
app.get('/books/book/:id', (req, res) => {
  const bookID = req.params.id;
  const bookById = books.find((item) => item.bookID === +bookID);
  
  // If bookID wasn't found
  if (!bookById) {
    res.send("Sorry, we cannot find any book with that ID :( Please try another ID!");
  };

  res.json(bookById);
});

// Returns all books per author /books/authorname
app.get('/books/author/:author', (req, res) => {
  const authors = req.params.author;
  const booksFromAuthors = books.filter((item) => item.authors === authors);
  
  // If authors is not found
  if (booksFromAuthors.length === 0) {
    res.send("Sorry, we cannot find any books from that author in our list. Try by entering the name in another way or search for another author.")
  };

  res.json(booksFromAuthors);
});

// Top rated books, the 20 highest 
app.get('/books/top-rated', (req, res) => {
  const topRated = books.filter((item) => item.average_rating >=4);
  const top20Books = topRated.slice(0, 20);
  res.json(top20Books);
});

// Empty/dummy endpoints
app.get('/books/isbn/:isbn', (req, res) => {
// To search by isbn number
  res.send('This endpoint does not have any content yet!')
});

app.get('/books/lesspages', (req, res) => {
  res.send('This endpoint does not have any content yet!')
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});
