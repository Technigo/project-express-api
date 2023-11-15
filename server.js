import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

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

// List of all enpoints
app.get("/", (req, res) => {
  res.json(listEndpoints(app));
});

//All books
app.get("/books", (req, res) => {
  res.json(booksData);
});

//One book
app.get("/book/:bookID", (req, res) => {
  const book = booksData.find((b) => b.bookID === parseInt(req.params.bookID));
  if (!book) return res.status(404).send("Book not found.");
  res.json(book);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
