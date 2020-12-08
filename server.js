import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
import booksData from "./data/books.json";
console.log(booksData.length);
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors()); //makes it easier for frontend to use the API. Corrs allows API's to say where requests can come from. To add extra security
app.use(bodyParser.json()); //This allows Express to read JSON in POST requests

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/books", (req, res) => {
  const { author } = req.query;
  if (author) {
    const filteredAuthor = booksData.filter(book => book.authors === author);
    res.json(filteredAuthor);
  } else {
    res.json(booksData);
  }
});

app.get("/books/:id", (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const book = booksData.find(book => book.bookID === +id);
  if (book) {
    res.json(book);
  } else {
    res.json(`Book id: ${id} not found`);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
