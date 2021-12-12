import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

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
app.use(bodyParser.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("This is the book API");
});

app.get("/endpoints", (req, res) => {
  res.send(listEndpoints(app));
});

// app.get('/users', (req,res)=> {
//   res.json(users);
// }),

app.get("/books", (req, res) => {
  const { differentBooks, language } = req.query;
  console.log(differentBooks, language);
  let booksDataToSend = booksData;

  if (differentBooks) {
    booksDataToSend = booksDataToSend.filter(
      (item) =>
        item.authors.toLowerCase().indexOf(differentBooks.toLowerCase()) !== -1
    );
  }

  if (language) {
    booksDataToSend = booksDataToSend.filter(
      (item) =>
        item.language_code.toLowerCase().indexOf(language.toLowerCase()) !== -1
    );
  }

  res.json({
    response: booksDataToSend,
    success: true,
  });
});

// path param //
app.get("/books/id/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const idOfBooks = booksData.find((book) => book.bookID === +id);
  if (!idOfBooks) {
    console.log(`NO books found`);
    res.status(404).send("Sorry there is no book with that Id");
  } else {
    res.json(idOfBooks);
  }
});

app.get("/books/title/:title", (req, res) => {
  const { title } = req.params;
  const TitleOfBooks = booksData.find((item) => item.title === title);
  if (!TitleOfBooks) {
    console.log(`NO books found`);
    res.status(404).json({
      response: " No book title find with that name",
      success: false,
    });
  } else {
    res.status(200).json({
      response: TitleOfBooks,
      success: true,
    });
  }
});

//  query param //
// app.get("/book/:title", (req, res) => {
//   const title = req.params.title;
//   const showTitle = req.query.title;

//   let TitleOfBooks = showTitle.filter((item) => item.title === +title);

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
