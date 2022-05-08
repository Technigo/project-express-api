import express, { request, response } from "express";
import cors from "cors";
import books from "./data/books.json";


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
  res.send(
    {"Welcome to the ultimate BOOK REVIEW LIST!":  [
{
      "books": "All books available", 
      "/books/id/:id": "Search for a book by specific id",
      "/books/title/:title": "Search for a book by specific title",
      "/books/authors/:authors": "Search for book/books written by specific author (alone or with others)",
      "/books/language_code/:language_code": "Search for books available in specific language",
    }
    ]
  } );
});

//All books available
app.get("/books", (req, res) => {
  res.status(200).json({
    data: books,
    success: true,
  });
  });


  //Endpoint 1: Searchning for a specific book by bookid
app.get('/books/id/:id', (req, res) => {
  const { id } = req.params
  const bookById = books.find ((item) => item.bookID === +id)

  if (!bookById) {
    res.status(400).json({
      ressponse: "There is no book with that ID number", 
      success: false,
    })
  } else {
    res.status(200).json({
      response: bookById, 
      success: true,
    })
  }
})

  //Endpoint 2: Searching for a specific  book title
  app.get("/books/title/:title", (req, res) => {
    const { title } =req.params;
    
    const bookByTitle = books.find((book ) => book.title.toLowerCase()=== title.toLowerCase());
    
    if (!bookByTitle){
      res.status(200).json({
        data: "Succesful search, but that book title is misspelled or not available here.",
        success: false
      });
    } else {
      res.status(200).json({
        data: bookByTitle, 
        success: true,
    });
    }
    });
  
  
    //Endpoint 3: Searching for books written by a specific author (alone or with authors)
    app.get('/books/authors/:authors', (req, res) => {
    const { authors } = req.params;
  
    let filteredAuthor = books;
  
    if (authors) {
  filteredAuthor = filteredAuthor
  .filter((item) => item.authors.toLowerCase().includes(authors.toLowerCase()));
    };
    if (filteredAuthor.length ===0) {
      res.status(200).json({
        data: "Successful search, but  there are no books by this author available here.",
        success: true,
      });
    } else {
      res.status(200).json({
        data: filteredAuthor,
        success: true,
      });
    };
    });
  

    //Endpoint 4: Searching for all books in  a specific language  
    app.get('/books/language_code/:language_code', (req, res) => {
      const { language_code } = req.params;
    
      const booksByLanguage = books.filter(
        (book) => book.language_code.toLowerCase () === language_code.toLowerCase()
        );
    
        if (booksByLanguage && booksByLanguage.length !== 0){
          res.status(200).json({
            data: booksByLanguage, 
            success: true,
          });
        } else if (booksByLanguage.length === 0) {
          res.status(200).json({
            data: "Successful search, but there are no books in this language available here.",
            success: true
        });
        } else {
          res.status(404).send({
            data: "Not found",
            success: false
          });
        }
      });
  

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
