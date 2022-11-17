import express, { request } from "express";
import cors from "cors";
import booksData from './data/books.json'
// import average_rating from '.data/books.json'

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
  // res.send({responseMessage: "Hello Technigo!"}); // we are send when we would like to sent translate json object
  res.json ({responseMessage: "Hello Technigo!"}) // it is sending as a json, which makes it more secure if there is some error
});

app.get("/library", (req, res) => {
 const { title, isbn, authors } = req.query;
   let books = booksData;

  if (title) {
    books = books.filter(singleBook => singleBook.title.toLowerCase() === title.toLowerCase()); // to be sure that API will read all possible way of writing it
                                                                                                // it is important to use toLowerCase function
  }

  if (isbn){
    books = books.filter(singleBook => singleBook.isbn == isbn);
  }

  if (authors) {
    books = books.filter(singleBook => singleBook.authors.toLowerCase() === authors.toLowerCase())
  }



  res.status(200).json ({
    success: true,
    message: "OK",
    body: {
      booksData: books
    }
   }) // it is sending as a json, which makes it more secure if there is some error

  

});

app.get("/library/:id", (req, res) => {
  const singleBook = booksData.find((item) => {
    return(item.bookID === + req.params.id)
  });
  console.log(singleBook)
  res.json ({booksData  : singleBook}) // it is sending as a json, which makes it more secure if there is some error
});

app.get("/library", (req, res) => {
  res.json (singleBook) // it is sending as a json, which makes it more secure if there is some error
});


// res.satus() allowed us to choose the response code message for examole 200, 404 etc.
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
