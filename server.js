import express from "express";
import cors from "cors";
import booksData from "./data/books.json";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'

// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Welcome to Books API");
});
//all books data
app.get("/books", (req, res) => {
  res.json(booksData);
});
// search by rating. Returns books with specified rating and those that have a smaller rating
// but still are close to the searching criteria
app.get("/rating/:rating", (req, res) => {
  const rating = parseFloat(req.params.rating);
  console.log({ rating });
  const selectedBooks = booksData.filter((item) => {
    return Math.abs(item.average_rating <= rating);
  });
  if (selectedBooks.length === 0) {
    res.status(404).send("data not found");
  }
  res.json(selectedBooks);
});

//by id
// app.get("/books/:id", (req, res) => {

// });

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
