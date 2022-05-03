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
  res.send("Hello Technigo!");
});

app.get("/books", (req, res) => {
  res.json(booksData)
})

app.get("/top-rated", (req, res) => {
  const highAvgRating =  booksData.filter((book) => book.average_rating >= 4)
  res.json(highAvgRating)
})

app.get("/title/:title", (req, res) => {
  const title = req.params.title
  let titleInput = booksData.filter((str) => str.title === title)
  res.json(titleInput)
})


//ask in Townhall http://localhost:8080/authors/Dan%20Brown
//how to disregards lower/upper cases?
app.get("/authors/:authors", (req, res) => {
  const authors = req.params.authors
  let authorsInput = booksData.filter((str)=> str.authors === authors)
  res.json(authorsInput)
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
