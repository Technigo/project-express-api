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
  // const highlyRated = req.query.average_rating < 4
  let ratedBooks = req.query.average_rating 

  if (ratedBooks) {
    booksData = booksData.filter((item) => item.average_rating <= 4)
  }

  res.json(booksData)
})

app.get("/books/:id", (req, res) => {
  const id = req.params.id
  const highlyRated = req.query.average_rating < 4
  let singleBook = booksData.filter((item) => item.bookID === Number(id))

  if (highlyRated) {
    singleBook = singleBook.filter((item) => item.average_rating)
  }

  console.log('Highly rated', highlyRated)

  res.json(singleBook)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
