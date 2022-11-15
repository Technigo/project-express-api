import express from "express";
import cors from "cors";
import books from "./data/books"
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
  res.status(200).json({books: books});
});

app.get("/books/:id", (req, res) => {
  const singleBook = books.find((book) => {
    return book.bookID === Number(req.params.id)
  })
  res.status(200).json(singleBook);
});

/*  app.get("/books/:authors", (req, res) => {
  const author = req.params.authors
  
  const authorOfBook = books.authors.find((author) => {
    return author.authors === req.params.authors
  })
  console.log(authorOfBook)
  res.status(200).json(authorOfBook);
});  */

 app.get("/authors", (req, res) => {
  /* const author = req.params.authors */
  let authorOfBooks = books.map((item) => {
    return item["authors"];
  })
  res.status(200).json({authorOfBooks});
 /*  var keyArray = objArray.map(function(item) { return item["key"]; }); */
}); 

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
