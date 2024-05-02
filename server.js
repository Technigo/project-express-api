import express from "express";
import cors from "cors";
import booksData from "./data/books.json";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";

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
app.route("/", (req, res) => {
  res.send("Hello Technigo!");
});

app.get(`/books`, (req, res) => {
  res.json(booksData);
});

app.get(`/author/:author`, (req, res) => {
  const author = req.params.author.toLowerCase();
  const booksFromAuthor = booksData.filter((item) => item.authors.toLowerCase().includes(author));
  res.json(booksFromAuthor);
});

app.get(`/title/:title`, (req, res) => {
  const title = req.params.title.toLowerCase();
  const bookTitle = booksData.filter((item) => item.title.toLowerCase().includes(title));
  res.json(bookTitle);
});

app.get(`/rating/:rating`, (req, res) => {
  const rating = req.params.rating;
  const bookRating = booksData.filter((item) => item.average_rating >= rating && item.average_rating < rating + 1);
  res.json(bookRating);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
