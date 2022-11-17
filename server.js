import express from "express";
import cors from "cors";
import booksData from "./data/books.json";

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Routes below

// Startscreen
app.get("/", (req, res) => {
  res.send({
    Message: "Hello and welcome to your friendly book search 📚. Below is the endpoints you can use to display data.",
    Routes: [
      {
        "/books": "Show all books.",
        "/books/:id": "Show a book by its id (1-1461).",
        "/books/titles/:title": "Show books by title or that includes a word in title you want to see. Ex Harry Potter",
        "/authors": "Sort out authors with their books.",
        "/authors/:name": "Show an author by name or includes a name. Ex Rowling",
      },
    ]});
});

// All books
app.get("/books", (req, res) => {
  res.status(200).json(booksData)
});

// Filter on bookID between 1-1461 (some numbers doesn't exist, like 6)
app.get("/books/:id", (req, res) => {
  const { id } = req.params
  const bookId = booksData.filter((book) => book.bookID === +id)

  if (bookId && bookId?.length > 0) {
    res.status(200).json(bookId)
    } else {
    res.status(404).send({
      message: "bookId not found, try another number",
      error: 404})
  }
});

// Find a book by title or that includes ex "Harry" or "galaxy"

app.get('/books/titles/:title', (req, res) => {
  const { title } = req.params
  const bookTitle = booksData.filter((book) => book.title.toLowerCase().includes(title.toLowerCase()))

  if (!bookTitle) {
    res.status(404).json({
      message: 'Sorry, no book with that name. Try another',
      error: 404}) 
  }

  res.status(200).json(bookTitle) 
})

// Lists all authors with books
app.get("/authors", (req, res) => {

 let authorList = booksData.map((i) =>  {
    return {
      "authors": i.authors.split('-').join(', '),
      "book": i.title,
      "id": i.bookID
  }}) 
  
  res.status(200).json(authorList)
});

//  Find an author by name or that includes ex "Rowling" or "j.k."
app.get("/authors/:name", (req, res) => {
  const { name }  = req.params
  const authorName = booksData.filter((item) => item.authors.toLowerCase().includes(name.toLowerCase()))


  if (!authorName) {
    res.status(404).send({
      message: "author name not found, try another",
      error: 404})
    }

  res.status(200).json(authorName)

 });


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
