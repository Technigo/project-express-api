import express from "express";
import cors from "cors";
import booksData from "./data/books.json";
import listEndpoints from "express-list-endpoints"

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Remove technigo and test later on
app.get("/test", (req, res) => {
  res.send("Hello from test!")
  console.log("Hello from test!")
})

// Books route
app.get("/books", (req, res) => {
  res.json(booksData)
})

// Singular book route
app.get("/books/:bookID", (req, res) => {
  const bookID = req.params.bookID

  const book = booksData.find(book => book.bookID === +bookID)
  if (book) {
    res.json(book)
  } else {
    res.status(404).send("No book found with that ID")
  }
})

//Add endpoint for author?

app.get("/", (req, res) => {
  const endpoints = listEndpoints(app)

  res.json({
    message: "Hello and welcome to the book API! Look for books at these endpoints:",
    endpoints: endpoints,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
