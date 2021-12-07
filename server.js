import express from "express";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
import booksData from "./data/books.json";
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
app.get("/books", (req, res) => {
  res.send(booksData);
});

//get a specific book based on id, using param
app.get("/books/:bookID", (req, res) => {
  const { bookID } = req.params;

  const bookDetail = booksData.find((book) => book.bookID === +bookID);

  if (!bookDetail) {
    res.status(404).send("no book found");
  } else {
    res.json(bookDetail);
  }
  //where you can get the title, author, rating, language
});

app.get("/books/authors", (req, res) => {
  // const { authors } = req.params;

  const allAuthors = booksData.map((author) => console.log(author));
  res.send(allAuthors);

  //sort it alphabetically?
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
