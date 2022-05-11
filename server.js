import express from "express";
import cors from "cors";
import booksData from "./data/books.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing- dont change them
app.use(cors());
app.use(express.json());



// Start defining your routes here
app.get("/", (req, res) => {
  
  res.send("Hi there! Here you can look for books by ID or title. Enjoy!");
});

//The first request with GET
app.get('/booksData', (req, res) => {
  res.status(200).json({
    data: booksData,
    sucess: true,
  });
});

//Find books by their ID number
app.get('/booksData/id/:id', (req, res) => {
const { id } = req.params;

const bookById = booksData.find((booksData) => booksData.bookID == id); 

console.log("Books by id:", bookById);

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


//Find books by their ISBN number
app.get('/booksData/isbn/:isbn', (req, res) => {
  const { isbn } = req.params;
  console.dir(isbn);
  
  const bookByIsbn = booksData.find((booksData) => booksData.isbn == isbn); 
  console.log(bookByIsbn);
  
  
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

//Get the book by title by filter method
app.get('/booksData/title/:title', (req, res) => {
  const { title } = req.params;

  const bookByTitle = booksData.filter((booksData) => booksData.title.toLowerCase() === title.toLowerCase()
  );
  res.status(200).json({
    data: bookByTitle,
    sucess: true,
    });
  
});
//console.log("Books by title:", bookByTitle);


// Start the server
app.listen(port, () => {
  console.log(`this is shown in terminal:Server running on http://localhost:${port}`);
});
