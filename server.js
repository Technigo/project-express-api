import express from "express";
import cors from "cors";
import technigomembers from './data/technigomembers.json';
import bodyParser from "body-parser";
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
  res.send("Enter your paths to get books from the list");
});

// get the whole booklist
app.get("/booklist", (req, res) =>
  res.json(booksData)
);

//Get single book by Id
app.get("/booklist/:id", (req, res) => {
  const singleBook = booksData.find((book) => {
    const { id } = req.params;
    return book.bookID === Number(req.params.id);
  });

  if (singleBook) {
    res.status(200).json(singleBook)
  } else {
    res.status(500).json({
      error: 'book not found'
    })
  };
})

// Books sorted by rating and top N rated numbers by query (eg. localhost:8080/rating?topN=5 gives top 5)
app.get("/rating", (req, res) => {
  const topN = req.query.topN;

  let booksByRating = booksData.sort((a, b) => b.average_rating - a.average_rating);
  
  if (topN) {
    booksByRating = booksByRating.slice(0, topN);
  }

  res.json(booksByRating);
});


/* More todos:
Add more filters, like: Return books that has a ratings count over 100
Post, put, patch...

*/

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});