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

//IDAH TEST comment here!!!
const listEndpoints = require("express-list-endpoints")

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  //res.send("Technigo-texten var här");
  //IDAH comment here vad lagt till
  res.send(listEndpoints(app));
});

//IDAH comment. Array of database.
app.get('/books', (req, res) => {
  //Fetch all books from the database or array
  res.json(booksData);
})

//IDAH comment. Single 
app.get('/books/:bookID', (req, res) => {
  const bookID = req.params.bookID
  // Fetch the book with the matching ID from the database or array
  const book = booksData.find(book => book.bookID === parseInt(bookID))
  if (book) {
    res.json(book)
  } else {
    res.status(404).send('Book not found')
  }
})

// Start the server IDAH: SYNS I LOCALHOST 8080
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// TEST IDAH SYNS I TERMINALEN
console.log("hello world")
console.log(booksData)
