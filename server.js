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
// app.use(bodyParser.json()); ----------------why not this one?

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/books", (req, res) => {
  res.json(booksData);
});

app.get("/books/authors/", (req, res) => {
  const allAuthors = booksData.map((item) => item.authors).sort();
  res.json(allAuthors);
});

app.get("/books/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const filteredIsbn = booksData.find((item) => item.isbn === +isbn);

  if (filteredIsbn.length === 0) {
    res.status(404).send("Invalid ISBN");
  } else {
    res.json(filteredIsbn);
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
