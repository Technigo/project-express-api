import express from 'express';
import cors from 'cors';
import listEndPoints from 'express-list-endpoints'; // for listing all routes

// importing data from .json file
import booksData from './data/books.json';

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// middleware for pagination and other filtration based on search criteria

function filteredAndPaginatedResults(booksDataToSend) {
  return (req, res, next) => {
    const {
      title,
      author,
      language,
      minRating,
      maxRating,
      minPages,
      maxPages,
    } = req.query;

    const pages = parseInt(req.query.pages);
    const limit = parseInt(req.query.limit);

    const response = {}; // for sending the response

    let filteredBooksData = booksDataToSend;
    //* ---------------  filtration based on different search criteria ------*//
    if (title) {
      filteredBooksData = filteredBooksData.filter(
        (book) => book.title.toLowerCase().indexOf(title.toLowerCase()) !== -1
      );
    }

    if (author) {
      filteredBooksData = filteredBooksData.filter(
        (book) =>
          book.authors.toLowerCase().indexOf(author.toLowerCase()) !== -1
      );
    }
    if (language) {
      filteredBooksData = filteredBooksData.filter(
        (book) =>
          book.language_code.toLowerCase().indexOf(language.toLowerCase()) !==
          -1
      );
    }

    if (minRating) {
      filteredBooksData = filteredBooksData.filter(
        (book) => book.average_rating >= +minRating
      );
    }

    if (maxRating) {
      filteredBooksData = filteredBooksData.filter(
        (book) => book.average_rating <= +maxRating
      );
    }
    if (minPages) {
      filteredBooksData = filteredBooksData.filter(
        (book) => book.num_pages >= +minPages
      );
    }
    if (maxPages) {
      filteredBooksData = filteredBooksData.filter(
        (book) => book.num_pages <= +maxPages
      );
    }
    //* --------------- for pagination -------- *//
    if (pages) {
      const startIndex = (pages - 1) * limit;
      const endIndex = pages * limit;

      if (endIndex < filteredBooksData.length) {
        response.next = {
          page: pages + 1,
          limit,
        };
      }
      if (startIndex > 0) {
        response.previous = {
          page: pages - 1,
          limit,
        };
      }
      response.response = filteredBooksData.slice(startIndex, endIndex);
      res.paginatedResults = response;
      next();
    } else {
      // for sending response without pagination
      response.response = filteredBooksData;
      res.paginatedResults = response;
      next();
    }
  };
}

// Start defining your routes here

// default route
app.get('/', (req, res) => {
  res.send(
    'Welcome to the books api. For detailed documentation please visit:  '
  );
});

// this will list all routes
app.get('/endpoints', (req, res) => {
  res.send(listEndPoints(app));
});

// route for all books or books based on a specific search criteria
app.get('/books', filteredAndPaginatedResults(booksData), (req, res) => {
  res.json({
    response: res.paginatedResults,
    success: true,
  });
});

// route for the books having  the specified rating
app.get('/books/rating/:rating', (req, res) => {
  const { rating } = req.params;

  const bookByRating = booksData.filter(
    (book) => book.average_rating === +rating
  );

  res.status(200).json({
    response: bookByRating,
    success: true,
  });
});

// route for the books having  specified no of pages
app.get('/books/pages/:pages', (req, res) => {
  const { pages } = req.params;

  const bookByPages = booksData.filter((book) => book.num_pages === +pages);

  res.status(200).json({
    response: bookByPages,
    success: true,
  });
});

// route for the books specific language
app.get('/books/language/:languageCode', (req, res) => {
  const { languageCode } = req.params;

  const booksByLanguage = booksData.filter(
    (books) => books.language_code.toLowerCase() === languageCode.toLowerCase()
  );

  res.status(200).json({
    response: booksByLanguage,
    success: true,
  });
});
// route for the book with specific ID
app.get('/books/id/:id', (req, res) => {
  const { id } = req.params;
  const bookId = booksData.find((book) => book.bookID === +id);

  if (!bookId) {
    res.status(400).json({
      response: `No book found with that ${id}`,
      success: false,
    });
  } else {
    res.status(200).json({
      response: bookId,
      success: true,
    });
  }
});

// route for the book with specific title
app.get('/books/title/:title', (req, res) => {
  const { title } = req.params;

  const bookTitle = booksData.find(
    (book) => book.title.toLowerCase() === title.toLowerCase()
  );

  if (!bookTitle) {
    res.status(400).json({
      response: `No book found with that ${title}`,
      success: false,
    });
  } else {
    res.status(200).json({
      response: bookTitle,
      success: true,
    });
  }
});

// route for the book with specific ISBN/ISBN13
app.get('/books/isbn/:isbn', (req, res) => {
  const { isbn } = req.params;

  const bookByIsbn = booksData.find(
    (book) => book.isbn === +isbn || book.isbn13 === +isbn
  );

  if (!bookByIsbn) {
    res.status(400).json({
      response: `No book found with that ${isbn}`,
      success: false,
    });
  } else {
    res.status(200).json({
      response: bookByIsbn,
      success: true,
    });
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
