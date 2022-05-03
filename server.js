import express from "express";
import cors from "cors";

import bookData from "./data/books.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());


//Start defining your routes here
app.get("/", (req, res) => {
  res.json(bookData);
});

//Return book datas according to ID 
app.get("/bookId/:id", (req, res) => {

  const id = +req.params.id;
  const bookId = bookData.find(book => book.bookID === id);
  
  if(!bookId) {
    res.status(404).json('Sorry, no book found. Please try another id')
  }
  res.json(bookId)
})

//Return highest rating books
app.get("/rating", (req,res) => {
  const highestRatingBook = bookData.filter(book => book.average_rating > 4);

  if(highestRatingBook.length === 0) {
    res.status(404).json('Sorry, no book with high rating found')
  }
  res.json(highestRatingBook)
})

//Return book datas according to title
app.get("/title/:title", (req,res) => {
  const bookTitle = req.params.title;
  const existingBook = bookData.find(book => book.title === bookTitle);

  if(!existingBook) {
    res.status(404).json ('The book with given title was not found')
  }
  res.json(existingBook)
})

//Return book datas according to specific author and title
app.get("/book/:author/:title" , (req,res) => {
   const findAuthor = bookData.filter(book => book.authors === req.params.author);

  const findTitle = findAuthor.find(book => book.title === req.params.title);
     
  if (!findTitle) {
    res.status(404).json('The book with given title was not found')
  }
    
  res.json(findTitle)
    
})

app.get("/newBook/book?title=Leviahan", (req, res) => {
  const filterTit = bookData.find(item => item.title === 'Leviathan');

  res.json(filterTit)
})
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
