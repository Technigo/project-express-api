/* eslint-disable linebreak-style */
import express from 'express';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';
import booksData from './data/books.json';


const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send(listEndpoints(app));
});

// Pages
app.get('/books/page', (req, res) => {
  let { page } = req.query;
  if (page) {
    const bookList = booksData.length;
    const booksPerPage = 25;
    const numOfPages = Math.ceil(bookList / booksPerPage);
    if (page > numOfPages) {
      page = numOfPages;
    }
    const firstPage = booksPerPage * (page - 1);
    let lastPage = page * booksPerPage;
    if (lastPage < 0) {
      lastPage = 0;
    }
  
    res.json({
      books: booksData.slice(firstPage, lastPage),
      page,
      numOfPages
    });
  }
  res.json(booksData);
});

// For toprateds and search for author
app.get('/books', (req, res) => {
  const { author, topRated } = req.query;
  // For toprated books
  if (topRated) {
    const sortedTopRated = booksData.sort((a, b) => a.average_rating - b.average_rating).reverse();
    const topRatedBooks = sortedTopRated.slice(0, topRated);
    res.json(topRatedBooks);
  }
  // Searching for author
  if (author) {
    const filteredByAuthor = booksData.filter((book) => book.authors.toLowerCase().includes(author.toLowerCase()));
    res.json(filteredByAuthor);
  }
  res.json(booksData);
});

// Endpoint to get one book by id
app.get('/books/:id', (req, res) => {
  const { id } = req.params;
  const book = booksData.find((item) => item.bookID === +id);
  if (!book) {
    res.status(404).send(`No book found with id number ${id}!`);
  }
  res.json(book);
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
