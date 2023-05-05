import express from "express";
import cors from "cors";
import bridgetsBooks from "./data/bridget-books.json"

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
const allEndpoints = require('express-list-endpoints');

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  // res.send("Hello Technigo!");
  res.json(allEndpoints(app));
});

app.get("/bridgetsbooks", (req, res) => {
  const { readstatus, author} = req.query;
  let books = bridgetsBooks;

  if (readstatus) {
    books = books.filter((book) => {
      return book.Read_Status.toLowerCase() === readstatus.toLowerCase();
    })
  }

  if (author) {
    books = books.filter((book) =>{
      return book.Author.toLowerCase().includes(author.toLowerCase())
    })
  }

  if (books) {
    res.status(200).json({
      success: true,
      message: "Seems to be working!",
      body: {
        bridgetsBooks: books
      }
    })
  } else {
    res.status(500).json({
      success: false,
      message: "Something has gone wrong.",
      body: { }
    })
  }
})

app.get("/bridgetsbooks/:isbn", (req, res) => {
  const singleBook = bridgetsBooks.find((book) => {
    const { isbn } = req.params
    return book.ISBN === Number(isbn)
  });
  if (singleBook) {
    res.status(200).json({
      success: true,
      message: "Seems to be working!",
      body: {
        book: singleBook
      }
    })
  } else {
    res.status(404).json({
      success: false,
      message: "Either there's a typo in your ISBN, OR Bridget hasn't/doesn't want to read that book.",
      body: {}
    })
}
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
