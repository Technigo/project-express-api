import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import booksData from './data/books.json';

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

const listEndpoints = require('express-list-endpoints');

// Start defining your routes here
app.get('/', (req, res) => {
  if(!res) {
    setTimeout(() => {
      res
      .status(404)
      .send({ Error: 'Sorry, a problem occured try again later' });
    }, 8000);
  }
  else res.send(listEndpoints(app));
});

// Route of books array, pagination as default
app.get('/books', (req, res) => {
  const { sort, author, title } = req.query;
  let booksList = booksData;
  const totalOfBooks = booksList.length ;

  //sort by rating
  if(sort === "rating_dsc") {
    booksList = booksList.sort((a, b) => (b.average_rating - a.average_rating));
  } else if (sort === "rating_asc") {
    booksList = booksList.sort((a, b) => (a.average_rating - b.average_rating));
  };
  
  //filter by author
  if (author) {
    booksList = booksList.filter((item) => item.authors.toString().toLowerCase().includes(author.toLowerCase()));
  };
  
  //filter by title
  if (title) {
    booksList = booksList.filter((item) => item.title.toString().toLowerCase().includes(title.toLowerCase()));
  };

  //PAGINATION limit of 20 results per page
  const page = req.query.page ? req.query.page -1 : 0;
  const pageSize = req.query.pageSize ?? 20;
  const startIndex = page * pageSize;
  const endIndex = startIndex + (+pageSize);
  const booksListPage = booksList.slice(startIndex, endIndex);
  const returnObject = { 
    totalNumberOfBooks: totalOfBooks,
    totalNumberOfPages: Math.ceil(booksList.length / pageSize), 
    booksReturned: pageSize, 
    currentPage: page + 1,
    results: booksListPage,
  };

  if (booksListPage.length === 0) {
    res
    .status(404)
    .send({ Error: 'Sorry, no books found, please try a different query' });
  };
  res.json(returnObject);
});

//Search by bookID
app.get("/books/:id", (req, res) => {
  const { id } = req.params;
  const bookId = booksData.find(item => item.bookID === +id);

  if (!bookId) {
    res
      .status(404)
      .send({ Error: `No book with id: "${id}" found` });
  } else res.json(bookId);
});

//POST a new book
app.post('/books/addbook', (req, res) => {
  const AddNewBook = {
    bookID: booksData.length + 1,
    title: req.body.title,
    authors: req.body.authors,
    average_rating: 0,
    isbn: req.body.isbn ? req.body.isbn : "not applicable",
    isbn13: req.body.isbn13 ? req.body.isbn13 : "not applicable",
    language_code: req.body.language_code ? req.body.language_code : "not applicable",
    num_pages: req.num_pages ? req.num_pages : 0,
    ratings_count: 0,
    text_reviews_count: 0,
  }
  booksData.push(AddNewBook);
  res.send(booksData);
});

//array of authors
app.get("/authors", (req, res) => {
  const authorsArray = booksData.map(item => item.authors);
  const uniqueAuthorsArray = [...new Set(authorsArray)];
  
  if (!authorsArray) {
    res
    .status(404)
    .send({Error: "something went wrong"});
  };
  res.send({authors: uniqueAuthorsArray.length, results: uniqueAuthorsArray});
});

//future endpoint
app.get("/isbn", (req, res) => {
  res.send("ISBN filtering soon to come.");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});