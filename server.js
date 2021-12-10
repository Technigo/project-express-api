import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from "./data/avocado-sales.json";
import booksData from "./data/books.json";
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello YAY");
});

app.get("/books", (req, res) => {
  res.json(booksData);
});

app.get("/books/id/:id ", (req, res) => {
  const { id } = req.params;

  const idOfBooks = booksData.find((book) => book.bookID === +id);
  if (!idOfBooks) {
    console.log(`NO books found`);
  } else {
    res.json(idOfBooks);
  }
});
öflsödlkaöldkaö;
// app.get("/book/:title", (req, res) => {
//   const title = req.params.title;
//   const showTitle = req.query.title;
//   // console.log(showWon);
//   let TitleOfBooks = data.filter((item) => item.title === +title);

//   if (title) {
//     TitleOfBooks = TitleOfBooks.filter((item) => item.title);
//   }

//   res.json(TitleOfBooks);
// });

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port} YAY YAY`);
});
