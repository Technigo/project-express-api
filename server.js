import express from "express";
import cors from "cors";
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
import booksData from "./data/books.json";
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

const users = [
  { id: 1, name: "Maria" },
  { id: 2, name: "Thomas" },
  { id: 3, name: "Jessics" },
  { id: 4, name: "Marc" },
];

// Defines the port the app will run on. Defaults to 8080, but can be overridden when starting the server. For example: PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express(); // To initialised a new express server

// Middlewares: to enable cors and json body parsing
app.use(cors()); // Cors is a technology which allows APIs to say where request can come from for security
app.use(express.json()); // bodyParser




// ROUTES: here we use only the response parameter

app.get("/", (req, res) => {
  res.send("I love cats");
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/books", (req, res) => {
  res.json(booksData);
});


//ENDPOINTS: here we use both parameters, the request first and lastly the response

app.get("/bookid/:id", (req, res) => {
  const { id } = req.params;
  const bookid = booksData.find((item) => item.bookID === +id);
  // find method to return only one book as each book has its unique id

  if (!bookid) {
    res.status(404).send("No book found with that id, sorry!");
  } else {
    res.json(bookid);
  }
});

app.get("/authors/:author", (req, res) => {
  const authorsName = req.params.author;
  const authorsInfo = booksData.filter((item) => item.authors === authorsName);
  // filter method to return an array with all of the books from the same authors
  res.json(authorsInfo);
});

app.get("/pages/:pages", (req, res) => {
  const pagesBook = req.params.pages;
  const numOfPages = booksData.filter((item) => item.authors === +pagesBook);
  // filter method to return an array with all of the books that have the same amount of pages
  res.json(numOfPages);
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
