import express from "express";
import cors from "cors";
import booksData from "./data/books.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden when starting the server. Example command to overwrite PORT env variable value: PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

//All books
app.get('/books', (req, res) => {
  res.json(booksData)
})

//Each book by iD
app.get('/books/:bookID', (req, res => {
  const bookID = req.params.bookID
  const singleBook = booksData.find((book) => book.bookID === +bookID)
  console.log('bookID', bookID, typeof bookID)
  if (book) {
    res.json(singleBook)
  } else {
    res.statusCode(404).send("No book was found")
  }
}))

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
