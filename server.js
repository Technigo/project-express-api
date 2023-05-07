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
  res.send("Hello!");
});


app.get("/bookshelf/page/:page", (req, res) => {
  const page = req.params.page;
  console.log(`requested page ${page}`);
  const limit = 10
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const result = booksData.slice(startIndex, endIndex);
  if (result) {
    res.status(200).json({
      success: true,
      message: "Found books!",
      body: {
      books: result },
  })
}  else {
  res.status(404).json({
    success: false,
    message: "Books not found!",
    body: {}
  })
}
})

app.get("/books/author/:author", (req, res) => {
  const author = req.params.author;
  let booksFromAuthor = booksData.filter((items) => items.authors === author);
  if (booksFromAuthor) {
    res.status(200).json({
      success: true,
      message: "Found books!",
      body: {
      books: booksFromAuthor },
  })
}  else {
  res.status(404).json({
    success: false,
    message: "Author/book not found!",
    body: {}
  })
}
})

app.get("/books/:bookId", (req, res) => {
  const bookId = req.params.bookId;
  let bookFromId = booksData.filter((item) => item.bookID === +bookId);
  if (bookFromId) {

    res.status(200).json({
      success: true,
      message: "Found book!",
      body: {
      book: bookFromId[0] },
  })
}  else {
  res.status(404).json({
    success: false,
    message: "Book not found!",
    body: {}
  })
}
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
