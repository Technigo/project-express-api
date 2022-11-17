import express, { request } from "express";
import listEndpoints from "express-list-endpoints";
// import express from "express";
import cors from "cors";
import booksData from "./data/books.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT envornmental variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
	res.json({BooksClubMessage: " Welcome to API for book data!", data: listEndpoints(app)});
});

//Create a new endpoint with collection of all Books data
app.get("/books", (req, res) => {
	res.status(200).json({booksData: booksData, success: true});
});
//Create a new endpoint with authors in alphabetic order
app.get("/books/authors/", (req, response) => {
  const allAuthors = booksData.map((item) => item.authors).sort();
	console.log(allAuthors);
	response.status(200).json(allAuthors);
});
//Create a new endpoint with bookID
app.get("/books/:id", (req, res) => {
  const id = req.params.id
  const bookId = booksData.find((item) => item.bookID === +id)
//404
  if (!bookId) {
    res.status(404).json({ errorMessage: "No book with this id found. Try to find the right id" })
  }
  res.json(bookId)
})
// Start the server.
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
