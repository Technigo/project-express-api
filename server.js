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
const listEndpoints = require('express-list-endpoints');

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Welcome to API about books!");
  //res.json(listEndpoints(app));

});
// http://localhost:8080/books/ultimate
app.get("/books/:title", (req, res) => {
 const title = req.params.title;

 let booksByTitle = booksData;

 if (title) {
 booksByTitle = booksByTitle.filter((data) => data.title.toLowerCase().includes(title.toLowerCase()));
};
if (booksByTitle.length === 0) {
  res.status(200).json({
    messege: "No books to be found",
    success: true,
  });
} else {
  res.status(200).json({
    data: booksByTitle,
    success: true,
});
}
});


// http://localhost:8080/books?authors=bill bryson
// http://localhost:8080/books
app.get("/books", (request, response) => {
  const { authors } = request.query;
  let books = booksData;

  if (authors) {
    books = booksData.filter((book) => {
      return book.authors.toLowerCase() === authors.toLowerCase();
    });
  } 

    response.status(200).json({
      data: books,
      success: true,
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
