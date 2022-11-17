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
  const { title, authors } = req.query;
  let allBooks = books;
/*  Write for example: http://localhost:8080/books?authors=Gary Paulsen to get all the authors books
    Write for example: http://localhost:8080/books?title=Hatchet to get the singel books info */

  if (authors) {
    allBooks = allBooks.filter(singleBook => singleBook.authors.toLowerCase() === authors.toLowerCase());
  }

  if (title) {
    allBooks = allBooks.filter(singleBook => singleBook.title.toLowerCase() === title.toLowerCase());
  } 

  res.status(200).json({
    success: true,
    message: "OK",
    body: { 
      books: allBooks
    }
    });
});

app.get("/books/:id", (req, res) => {
  const singleBook = books.find((book) => {
    return book.bookID === Number(req.params.id)
  })

  if (singleBook) {
    res.status(200).json({
    success: true,
    message: "OK",
    body: { 
      book: singleBook 
    }
    })
  } else  {
    res.status(400).json({
    success: false,
    message: "Not Found",
    body: {}
    })
  }
  res.status(200).json(singleBook);
});

 /* solution from StackOverflow var keyArray = objArray.map(function(item) { return item["key"]; }); */

 app.get("/authors", (req, res) => {
  let authorOfBooks = books.map((item) => {
    return item["authors"];
  })
  res.status(200).json({authorOfBooks});
}); 

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
