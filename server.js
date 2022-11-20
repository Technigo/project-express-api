import express, { query } from "express";
import cors from "cors";
import booksData from "./data/books.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.json({booksData});
});

// An alternative to get the array in pages 
// e.g. http://localhost:8080/allbooks?page=1&limit=100
app.get("/", paginatedResults(booksData), (req, res) => {
  res.json(res.paginatedResults);
});

//filter books by typing author or title as a query parameter
// e.g. http://localhost:8080/books?author=Bill%20Bryson
app.get('/books', (req, res) => {
	const { author, title } = req.query
	let filteredBooks = booksData
	
	if(author) {
    filteredBooks = filteredBooks.filter((item) => 
    item.authors.toLocaleLowerCase()
    .includes(author.toLocaleLowerCase()))
    console.log(filteredBooks)
  }

	if(title) {
    filteredBooks = filteredBooks.filter((item) => 
    item.title.toLocaleLowerCase()
    .includes(title.toLocaleLowerCase()))
  }

  if(filteredBooks.length === 0) {
    return res.status(404).json("Sorry we couldn't find book you seek")
  } else {
    res.json(filteredBooks);
  }
  
})

// filter books by id
// e.g. http://localhost:8080/books/23

app.get("/books/:id", (req, res) => {
  const singleBook = booksData.filter((item) => item.bookID == req.params.id)
  if (singleBook.length === 0) {
    res.status(404).json("Sorry, this book does not exist. Try again with another number");
  } else {
    res.json(singleBook)
  }
});

function paginatedResults (model) {
  return (req, res, next) => {
    const page = +req.query.page 
    const limit = +req.query.limit
  
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    
    const results = {}
  
    if (endIndex < model.length) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }
      if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      }
    }
  
    results.results = model.slice(startIndex, endIndex)

    res.paginatedResults = results
    next()
    }
}

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
