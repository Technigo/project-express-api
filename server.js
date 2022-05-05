import express, { request, response } from "express";
import cors from "cors";
import books from "./data/books.json";
import res from "express/lib/response";



// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
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
res.status(200).json(books);
});

app.get("/books/:title", (req, res) => {
const bookByTitle = books.find(
  (book ) => book.title=== req.params.title
  );

  res.status(200).json(bookByTitle);
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
