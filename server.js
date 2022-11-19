import express, { request } from "express";
import cors from "cors";
import booksData from "./data/books.json";

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
const listEndpoints = require('express-list-endpoints');

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.json(listEndpoints(app));
  res.json("Let us see if this message will show and if it is possible to search for book titles and authors")
});

app.get("/books", (req, res) => {
  const { authors, title } = req.query;
  let books = booksData;

  if (author) {
    books = books.filter(name => name.authors.toLowerCase() === 
    authors.toLowerCase());
  }

  if (title) {
    books = books.filter(singleBook => { return singleBook.title.toLowerCase() === 
      title.toLowerCase()});
  }
  respons.status(200).json({
    success: true,
    message: "OK",
    body: {
      booksData: filteredBooks
    }
  });
});

app.get("/books/:bookID", (req, res) => {
  const singleBook = booksData.find((item) => {
    return (item.bookID === +req.params.id);
  });

  if(singleBook) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        book: singleBook
      }
    });
  } else {
    response.status(404).json({
      success: false,
      message: "Not Found",
      body: {}
    });
  }
  console.log(singleBook);
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
