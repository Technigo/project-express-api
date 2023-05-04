import express from "express";
import cors from "cors";
import technigoMembers from "./data/technigo-members.json";
import booksData from "./data/books.json";

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
// const listEndpoints = require('express-list-endpoints');

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// This will show when you go to url of the API, it shows you how you can access different things in the API
app.get("/", (request, response) => {
  const bookAPIGuide = {
    Routes: [
      { 'Hello': 'Welcome to Annikas book-API! See instrucktions below',
        '/books': 'Get all books.',
        '/books/authors=[authorname]': 'Get all books with that author. Be aware that authors is plural.',
        '/books/?title=[title]': 'Get all books with that title, you can write a part of the title.',
        '/books/?title=[title]&authors=[authorname]': 'Get books with a specific author and title. You can write part of the authors name',
        '/books/:bookID': 'Get specific book by ID',
        '/isbn/:isbn': 'Get a book`s isbn',
        '/languages/language_code': 'Get book by language. For example fre, spa, eng, en-us, en-gb and mul',
        '/top_10': 'Get the top 10 highest rating books, based on average rating'
      },
    ],
  };
  //The response
    response.json({responseMessage: bookAPIGuide});
})


///////////// ROUTE Get all books in the database ///////////////////////
app.get("/books", (request, response) => {
  const authors = request.query.authors;
  const title = request.query.title;

  let filteredBooks = booksData; 

  if (authors) {
    filteredBooks = filteredBooks.filter((singleBook) => {
      return singleBook.authors.toLowerCase().includes(authors.toLocaleLowerCase())

    });
  } 

  if (title) {
    filteredBooks = filteredBooks.filter((singleBook) => {
      return singleBook.title.toLowerCase().includes(title.toLocaleLowerCase())
    })
  }
  
  if (filteredBooks.length !== 0){
    //If the books-array is NOT empty, show sucess and the items in the array
    response.status(200).json({
      success: true, 
      message: "OK",
      body: {
        books: filteredBooks
      } 
    })
  } else {
    //If the array IS empty show error message
    response.status(404).json({
      success: false, 
      message: "Something went wrong, could find what you were searching for.",
      body: {}
    })
  }
})

///////// ROUTE Get a specific book, using the ID of the book //////////
app.get("/books/:id", (request, response) => {
const { id } = request.params;
//Object destructuring of the is request param
const singleBook = booksData.find((book) => {
  return book.bookID.toString() === id; 
})
//We 
if (singleBook) {
  response.status(200).json({
    success: true, 
    message: "OK",
    body: { 
      book: singleBook
    }
  })
} else {
  response.status(404).json({
    success: false,
    message: "Book not found!",
    body: {}
  })
}

})

////////////// ROUTE Get filter the books based on the languages ////////////
app.get("/books/languages/:language_code", (request, response) => {
  const languages = booksData.filter((book) => {
    return book.language_code.toLowerCase() === request.params.language_code.toLowerCase()
  }) 
  if (languages.length !== 0){
    response.status(200).json({
      success: true, 
      message: "OK",
      body: { 
        language: languages
      }
    })
  } else {
    response.status(404).json({
      success: false, 
      message: "Language not found!",
      body: {}
    })
  }
})

//// ROUTE Get the top 10 rated books based on their average rating ////////
app.get("/top_10", (request, response) => {
  const sortedBooks = booksData.sort((a, b) => b.average_rating - a.average_rating).slice(0, 10);

  if(sortedBooks.length > 0) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        top_10: sortedBooks
      }
    })
  } else {
    response.status(500).json({
      success: false, 
      message: "Something went wrong",
      body: {}
    })
  }
})

///// ROUTE Get book by ISBN ////////
app.get("/books/isbn/:isbn", (request, response) => {
  const { isbn } = request.params;
  console.log("isbn: ", isbn);
  const singleBook = booksData.find((book) => {
    return book.isbn.toString() === isbn; 
  })
  if (singleBook) {
    response.status(200).json({
      success: true, 
      message: "OK",
      body: { 
        book: singleBook
      }
    })
  } else {
    response.status(404).json({
      success: false,
      message: "Book not found!",
      body: {}
    })
  }
  
  })

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
