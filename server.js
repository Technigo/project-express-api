import express from "express";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
import booksData from "./data/books.json";

// console.log(booksData.length); -- 450st!

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
app.get("/books", (req, res) => {
  const { author } = req.query;

  // const page = parseInt(req.query.page);
  // const limit = parseInt(req.query.limit);

  // const startIndex = (page - 1) * limit;
  // const endIndex = page * limit;

  // const results = {};

  // if (endIndex < booksData.length) {
  //   results.next = {
  //     page: page + 1,
  //     limit: limit,
  //   };
  // }

  // if (startIndex > 0) {
  //   results.previous = {
  //     page: page - 1,
  //     limit: limit,
  //   };
  // }

  // results.results = booksData.slice(startIndex, endIndex);
  // res.send(results);

  let authorToFind = booksData;

  if (author) {
    authorToFind = authorToFind.filter(
      (item) => item.authors.toLowerCase().indexOf(author.toLowerCase()) !== -1
    );
  }

  res.send({
    response: authorToFind,
    success: true,
  });

  res.send({
    response: booksData,
    success: true,
  });
});

//get a specific book based on id, using param
app.get("/books/bookid/:bookID", (req, res) => {
  const { bookID } = req.params;

  const bookDetail = booksData.find((book) => book.bookID === +bookID);

  if (!bookDetail) {
    res.status(404).send("no book found");
  } else {
    res.json(bookDetail);
  }
  //where you can get the title, author, rating, language
});

app.get("/books/topbooks", (req, res) => {
  const { topBooks } = req.params;

  const topRatedBooks = booksData.filter((book) => book.average_rating >= +4);
  res.json(topRatedBooks);
  // console.log(topBooks.length);
});

app.get("/books/authors/:authors", (req, res) => {
  const allAuthors = booksData.map((item) => item.authors).sort();
  res.send(allAuthors);
});

app.post("/postbook", (req, res) => {
  const { body } = req;
  res.send(body);
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
