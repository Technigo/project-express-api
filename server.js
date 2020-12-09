import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import booksData from './data/books.json'

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Welcome to the Book Reviews [statistics] API')
})

app.get('/authors', (req, res) => {
  const authors = booksData.map(item =>item.authors)
  const uniqueAuthors = [...new Set(authors)]

  // Query string - try /authors?author=tolstoy
  const searchedAuthor = req.query.author;
  const searchedAuthorObject = booksData.filter(item => item.authors.includes(searchedAuthor));
  const searchedAuthorList = searchedAuthorObject.map(item => item.authors);
  const uniqueSearchedAuthor = [...new Set(searchedAuthorList)];

  if (searchedAuthor) {
    res.json(uniqueSearchedAuthor)
  }
  res.json(uniqueAuthors);
})

app.get('/authors/:author', (req, res, next) => {
  const author = req.params.author
  const booksByAuthor = booksData.filter(item => item.authors === author);
  const authors = booksByAuthor.map(item => item.authors);
  const uniqueAuthors = [...new Set(authors)];

  // Error when no unique author found
  if (uniqueAuthors.length === 0) {
    const error = new Error("Author not found");
    error.status = 404;
    throw error;
  }
  res.json(uniqueAuthors);
})

app.get('/authors/:author/books', (req, res, next) => {
  const author = req.params.author
  const booksByAuthor = booksData.filter(item => item.authors === author);

  // Query string - try: /author/author/books?author="Rowling"
  const searchedAuthor = req.query.author;
  const booksBySearchedAuthor = booksData.filter(item => item.authors.includes(searchedAuthor));

  if (searchedAuthor) {
    res.json(booksBySearchedAuthor)
  }

  // Error when no author
  if (booksByAuthor.length === 0) {
    const error = new Error("Author not found");
    error.status = 404;
    throw error;
  }
  res.json(booksByAuthor);
})

app.get('/books', (req, res, next) => {
  res.json(booksData);
})

app.get('/books/:book', (req, res, next) => {
  const bookId = parseInt(req.params.book);
  const filteredBookID = booksData.filter(item => item.bookID === bookId);

  // const searchedTitles = req.query.title;
  // const searchedTitlesList = booksData.filter(item => item.title.includes(searchedTitles));
  // if (searchedTitles) {
  //   res.json(searchedTitlesList)
  // }

  //Error when no bookID
  if (filteredBookID === 0) {
    const error = new Error("Book not found");
    error.status = 404;
    throw error;
   }
  res.json(filteredBookID)
})

// For it to be RESTful it should've been a list of actual ratings, 
// but am going with the data I have at hand.

app.get('/books/:book/ratings' , (req, res, next) => {
  const bookId = parseInt(req.params.book);
  const books = booksData.filter(item => item.bookID === bookId);
  const bookRatings = books.map(item => [
    {
      "title": item.title,
      "author": item.authors,
      "average_rating": item.average_rating, 
      "number_of_votes": item.ratings_count, 
      "number_of_text_reviews": item.text_reviews_count
    }
  ]);
  // Error when wrong bookID
  if (books.length === 0) {
    const error = new Error("Book not found");
    error.status = 404;
    throw error;
   }
  res.json(bookRatings);
})

// Error handling fall back when req is not found
app.use((next) => {
  const error = new Error(`Not found`);
  error.status = 404;
  next(error);
 });

// Middleware for error handling 
 app.use((error, req, res, next) => {
   res.status(error.status || 500).send({
    error: {
    status: error.status || 500,
    message: error.message || "Internal Server Error",
   },
  });
 });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
