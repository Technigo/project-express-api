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
  res.send("Welcome to The Book Server. Enter a path provided in the documentation to get book data");
});

// get the whole booklist (and filter by title, author or id)
app.get("/books", (req, res) => {
  const { title, author, id } = req.query;

  let filteredBooks = booksData;

  if (title) {
    filteredBooks = filteredBooks.filter((book) => {
      return book.title.toLowerCase().includes(title.toLowerCase());
    });
  }

  if (author) {
    filteredBooks = filteredBooks.filter((book) => {
      return book.authors.toLowerCase().includes(author.toLowerCase());
    });
  }

  if (id) {
    filteredBooks = filteredBooks.filter((book) => {
      return book.bookID === Number(id);
    });
  }
  // If there is more than 0 matches, this json is returned 
  if (filteredBooks.length > 0) {
    res.status(200).json({
      success: true,
      message: `Found ${filteredBooks.length} books`,
      body: {
        books: filteredBooks,
      },
    });
  } else {  // if no matches found
    res.status(404).json({
      success: false,
      message: "404 No matching books found",
      body: {},
    });
  }
});


//Sorting function for authors in ascending order
app.get("/books/authors", (req, res) => {
  
  const sorting = (arr, key, direction = 'asc') => {   
    if (direction === 'asc') {
      return arr.sort((a, b) => (a[key] > b[key]) ? 1 : (b[key] > a[key] ? -1 : 0))
    } else {
      return arr.sort((a, b) => (a[key] < b[key]) ? 1 : ((b[key] < a[key]) ? -1 : 0))
    }
  };

  let sortedByAuthorAsc = sorting(booksData, 'authors');
  
  if (sortedByAuthorAsc.length > 0) {
    res.status(200).json({
      success: true,
      message: 'Books sorted by author',
      body: {
        books: sortedByAuthorAsc
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: '404 found no authors to sort',
      body: {}
    });
  }
});



// Books sorted by rating and top N rated numbers by query (eg. localhost:8080/rating?topN=5 gives top 5)
app.get("/books/ratings", (req, res) => {
  const { topN } = req.query;

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



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


/// Api for fetching booklist from pretend server
