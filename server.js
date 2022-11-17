import express from "express";
import cors from "cors";
import books from "./data/books.json"

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, response) => {
const bookGuide = {
  Endpoints: [
    {
      '/books': 'Get all books',
      '/books/:bookID': 'Get book by ID',
      /* '/books/languages/language_code': 'Get book by language' */
      '/authors/:authors': 'Get book by author'
    },
  ],
};
  /* console.log("req", req)
  console.log("res", res) */
  /* res.send({responseMessage: "Hello Technigo!"}); */
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
   return author.authors === + request.params.aouthors;
  })
  if(!authors) {
    response.status(404).send('Error: Book not found')
  } else {
    response.status(200).json(authors);
  }
  
});

/* app.get("/books/languages/:language_code", (request, response) => {
  const languages = books.filter((language) => {
   return language.language_code === +request.params.language_code;
  })
  response.status(200).json(languages);
}); */

// Gets book by language

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
