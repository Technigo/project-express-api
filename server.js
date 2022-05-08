import express from "express";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";
// import members from "./data/technigo-members.json";

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
  res.send("Hello Book Entusiats!");
});

app.get("/books", (req, res) => {
  res.status(200).json({
    data: booksData,
    success: true,
  });
})

app.get("/books/title/:title", (req, res) => {
  const { title } = req.params;

  const bookByName = booksData.find(
    (book) => book.title.toLowerCase() === title.toLowerCase()
  );

  if (!bookByName) {
    res.status(404).json({
      data: "Not found",
      success: false,
    });
  } else {
    res.status(200).json({
      data: bookByName,
      success: true,
    });
  }
});

app.get("/books/author/:author", (req, res) => {
  const { author } = req.params;

  const booksByAuthor = booksData.filter(
    (book) => book.authors.toLowerCase() === author.toLowerCase()
  );

  res.status(200).json({
    data: booksByAuthor,
    success: true,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
