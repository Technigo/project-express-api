import express from "express";
import cors from "cors";
import books from "./data/books.json"

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Defines the routes
app.get("/", (req, response) => {
const bookGuide = {
  Routes: [
    {
      '/books': 'Get all books',
      '/books/:bookID': 'Get specific book by ID',
      '/isbn/:isbn': 'Get a book`s isbn',
      '/languages/language_code': 'Get book by language',
      '/authors/:authors': 'Get book by author',
      '/best': 'Get books sorted by rating, highest to lowest'
    },
  ],
};
  response.json({responseMessage: bookGuide});
});

// Gets all books in array
app.get("/books", (req, response) => {
  response.status(200).json({books: books});
  
});

// Gets book by ID
app.get("/books/:bookID", (request, response) => {
  const singleBook = books.find((book) => {
   return book.bookID === + request.params.bookID;
  })
  if(!singleBook) {
    response.status(404).send('Error: Book not found')
  } else {
    response.status(200).json(singleBook);
  }
  
});

// Gets book by Author
app.get("/authors/:authors", (request, response) => {
  const authors = books.find((author) => {
   return author.authors.toLowerCase() === request.params.authors.toLocaleLowerCase();
  })
  if(authors) { 
    response.json(authors)
    } else {
    response.status(404).send("Error: Author not found")
    }
  
});

// Get book by language
app.get("/languages/:language_code", (request, response) => {
  const languages = books.filter((language) => {
   return language.language_code.toLowerCase() === request.params.language_code.toLowerCase();
  })
  if(languages.length !== 0) { 
    response.json(languages)
    } else {
    response.status(404).send("Error: Language not found")
    }
});

// Get book by isbn
app.get("/isbn/:isbn", (request, response) => {
  const isbnNumbers = books.filter((isbn) => {
   return isbn.isbn === +request.params.isbn;
  })
  if(isbnNumbers) { 
    response.json(isbnNumbers)
    } else {
    response.status(404).send("Error: Isbn not found")
    }
});

// books sorted by average rating, highest to lowest
app.get("/best", (req, res) => {
  const best = books.sort(
    (a, b) => b.average_rating - a.average_rating
  )
  res.status(200).json(best)
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});