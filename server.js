import express from "express";
import cors from "cors";
import booksData from "./data/books.json";

// Defines the port the app will run on, can be overridden 
const port = process.env.PORT || 8080;
const app = express();

// Middlewares to enable cors and json body parsing (should not be changed)
app.use(cors());
app.use(express.json());


// ROUTES

//Startpage with definition of routes
app.get("/", (req, res) => {
  
  res.send({
    "Books API" : "Look for books by ID, ISBN number or title",
    "Routes":[{
      "/booksData": "Get all books",
      "/booksData/isbn/:isbn": "Get a book by its ISBN number",
      "/booksData/id/:id": "Get a book by its ID number in the database",
      "/booksData/authors/:authors": "Get a book by its author/authors",
    }]
  });
 
});


//The first request to get the whole array of books
app.get('/booksData', (req, res) => {
  res.status(200).json({
    data: booksData,
    sucess: true,
  });
});

//Find books by their ID number of the array by .find() method
app.get('/booksData/id/:id', (req, res) => {
const { id } = req.params;

const bookById = booksData.find((booksData) => booksData.bookID == id); 

//Deliver a status of 404 if the ID number is not found and 200 if it returns ok
  if (!bookById) {
  res.status(404).json({
   data:"Not found",
   sucess: false,
  });
  } else {
  res.status(200).json({
    data: bookById,
    sucess: true,
 });
};
});


//Find books by their ISBN number by .find() method
app.get('/booksData/isbn/:isbn', (req, res) => {
  const { isbn } = req.params;
    
  const bookByIsbn = booksData.find((booksData) => booksData.isbn == isbn); 
    
  //Deliver a status of 404 if the ISBN number is not found and 200 if it returns ok
    if (!bookByIsbn) {
    res.status(404).json({
     data:"Not found",
     sucess: false,
    });
    } else {
    res.status(200).json({
      data: bookByIsbn,
      sucess: true,
   });
  };
  });

//Get the book by title by filter.() method
app.get('/booksData/title/:title', (req, res) => {
  const { title } = req.params;

  const bookByTitle = booksData.filter((booksData) => booksData.title.toLowerCase() === title.toLowerCase()
  );
  res.status(200).json({
    data: bookByTitle,
    sucess: true,
  });
});


//Get the books from a certain author by .filter() method
app.get('/booksData/authors/:authors', (req, res) => {
  const { authors } = req.params;

  const booksByAuthor = booksData.filter((booksData) => booksData.authors.toLowerCase() === authors.toLowerCase()
  );
     res.status(200).json({
      data: booksByAuthor,
      sucess: true,
    });
  });
// });
// Start the server
app.listen(port, () => {
  console.log(`This is shown in terminal: Server running on http://localhost:${port}`);
});
