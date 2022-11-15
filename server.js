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

// Route that returns all data on all books
app.get("/books", (req, res) => {
  // usually written: res.send({responseMessage: "Hello Technigo"})
  let allBooks = booksData;

  // Filter for top-rated books
  const showTop = req.query.top;
  if (showTop) {
    allBooks = allBooks.filter((book) => book.average_rating > '4.5')
  } 
  res.json({ booksData: allBooks }) 
});


// Route for books by a specific author
app.get("/books/:author", (req, res) => {
  const author = req.params.author
  const byAuthor = booksData.filter((book) => book.authors.toLowerCase() === author.toLowerCase())
  res.json({ byAuthor }) 
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
