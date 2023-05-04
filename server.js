import express from "express";
import cors from "cors";
import booksData from "./data/books.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
// Will create a list of all endpoints in our API
const listEndpoints = require('express-list-endpoints');

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
// When the user makes a GET request to this route, the code block will be executed.
app.get("/", (request, response) => {
  response.send({
    success: true,
    message: "OK",
    body: {
      content: "A list of 500 book reviews",
      endpoints: listEndpoints(app)
    }
  });
});


// Will return a full list of the dataset
// If it does not find any books, it returns error message and empty body
// Here we also add some queries
app.get("/books", (request, response) => {
  let books = booksData

  const { language_code } = request.query;
  console.log('language_code:', language_code, '-- variable type', typeof language_code)

  const { minrating } = request.query
  console.log('minrating:', minrating)

  if (books) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        content: "A list of 500 book reviews",
        books: books
      }
    });
} else {
  response.status(500).json({
    success: false,
    message: "Something went wrong",
    body: {}
  });
}
  // E.g. http://localhost:8080/books?language_code=spa will give us all the books in spanish
  if (language_code) {
    books = booksData.filter((item) => {
      return item.language_code.toLowerCase() === language_code.toLowerCase();
    });
  }

  
  // E.g. http://localhost:8080/books?minrating=4.5
  if (minrating) {
    books = booksData.filter((singleBookRating) => 
      singleBookRating.average_rating.toString() >= minrating.toString())
  }
  

});




// Will return a single book based on the id (params)
// If the book does nit exist, it will return an error code & empty body
app.get("/books/:id", (request, response) => {
  const { id } = request.params;
  const booksId = booksData.find((item) => {return item.bookID === Number(id)})
  console.log('id:', id)
  console.log('booksId:', booksId)

  if (booksId) {
      response.status(200).json({
        success: true,
        message: "OK",
        body: {
          content: `A book with id ${id}`,
          book: booksId
        }
      });
    } else {
      response.status(404).json({
        success: false,
        message: "Book not found",
        body: {}
      });
}
});

// Will return a full list of the books that satisfies this condition => new endpoint?
// Will return all non-english books
app.get("/books/nonenglishbooks", (request, response) => {
  const nonEnglishBooks = booksData.filter((book) => !["eng", "en-US", "en-GB"].includes(book.language_code));
  // console.log('nonEnglishBooks:', nonEnglishBooks, '--var type:', typeof nonEnglishBooks);

  if (nonEnglishBooks) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        content: 'All books which are not in english',
        books: nonEnglishBooks
      }
    });
} else {
  response.status(500).json({
    success: false,
    message: "Something went wrong",
    body: {}
  });
}
});


// We get the data sorted by rating and make an endpoint where we show the 100 highest rated
app.get("/top100", (request, response) => {
  const sortedData = booksData.sort((a, b) => b.average_rating - a.average_rating);
  const top100 = sortedData.slice(0, 100);

  response.status(200).json({
    success: true,
    message: "OK",
    body: {
      content: 'The 100 highest rated books in the list',
      books: top100
    }
  })
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

