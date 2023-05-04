import express from "express";
import cors from "cors";
import booksData from "./data/books.json";


// App running on port 8080
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Enter your paths to get books from the list");
});

// get the whole booklist
app.get("/books", (req, res) =>
  res.json(booksData)
);

//Sorting function for ascending order
app.get("/books/authors", (req, res) => {
  const sorting = (arr, key, direction = 'asc') => {
    if (direction === 'asc') {
      return arr.sort((a, b) => (a[key] > b[key]) ? 1 : (b[key] > a[key] ? -1 : 0))
    } else {
      return arr.sort((a, b) => (a[key] < b[key]) ? 1 : ((b[key] < a[key]) ? -1 : 0))
    }
  };

  const sortedByAuthorAsc = sorting(booksData, 'authors');
  //Make if-statement to sort by title etc.
  // const sortedByTitle = sorting(booksData, 'title');
  res.json(sortedByAuthorAsc);
});

// Books sorted by rating and top N rated numbers by query (eg. localhost:8080/rating?topN=5 gives top 5)
app.get("/books/ratings", (req, res) => {
  const topN = req.query.topN;

  let booksByRating = booksData.sort((a, b) => b.average_rating - a.average_rating);
  
  if (topN) {
    booksByRating = booksByRating.slice(0, topN)
  };

  res.json(booksByRating);
});

// Get books by min/max page number by query (Eg. /books/pages?minPages=100&maxPages=500)
app.get('/books/pages', (req, res) => {
  const { min, max } = req.query;
  let countedBooks = booksData;

  if (min && max) {
    countedBooks = countedBooks.filter((book) => {
      return book.num_pages >= Number(min) && book.num_pages <= Number(max)
    }) 
  } else if (min) {
    countedBooks = countedBooks.filter((book) => {
      return book.num_pages >= Number(min)
    }) 
  } else if (max) {
    countedBooks = countedBooks.filter((book) => {
      return book.num_pages <= Number(max)
    }) 
  };
  //Sorts the filtered list in ascending order
  const sortedCount = countedBooks.sort((a, b) => a.num_pages - b.num_pages);
  res.json(sortedCount);
});

//Get single book by Id, title or name
app.get("/books/:id", (req, res) => {
  const singleBook = booksData.find((book) => {
    const { id } = req.params;
    return book.bookID === Number(req.params.id);
  });

  if (singleBook) {
    res.status(200).json({
      sucess: true,
      message: 'OK',
      body: {
        book: singleBook
      }
      });
  } else {
    res.status(500).json({
      sucess: false,
      message: 'Book not found',
      body: {}
    });
  };
});

/* More todos:
Add more filters, like: Return books that has a ratings count over 100
// Add a return body for the response status(200) and (500)

*/

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


/// Api for fetching booklist from pretend server
