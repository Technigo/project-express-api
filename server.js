import express from "express";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello and welcome to your friendly book search! Toggle the meny to see info about what you need!");
});

app.get("/books", (req, res) => {
  res.json(booksData)
});

app.get("/books/:id", (req, res) => {
  const id = req.params.id
  const bookId = booksData.filter((book) => book.bookID === +id)

  if (bookId && bookId?.length > 0) {
    res.json(bookId)
    } else {
    res.status(404).send("bookId not found, try another")
  }
});

app.get("/authors", (req, res) => {
  const id = req.params.id
  const bookId = booksData.filter((book) => book.bookID === +id)
  res.json(bookId)

});



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
