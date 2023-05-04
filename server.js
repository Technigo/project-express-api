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
const listEndpoints = require('express-list-endpoints')

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.json(listEndpoints(app));
});

app.get("/books", (req, res) => {
  let books = booksData
  const title = req.query.title
  const rating = req.query.average_rating

if (title) {
  books = books.filter((singleBookTitle) => 
    singleBookTitle.title.toLowerCase().includes(title.toLowerCase()))
}

// if (rating) {
//   books = books.filter((singleBookRating) => 
//     singleBookRating.average_rating.toString() >= rating.toString())
//     // singleBookRating.rating.includes(rating))
//     // singleBookRating.rating >= Number(rating))
// }

if (books.length >= 1) {
  res.status(200).json({
    success: true, 
    message: "OK", 
    body: {
      books: books
    }
  })
} else {
  res.status(500).json({
    success: false, 
    message: "Can't find any title that includes this query value", 
    body: {}
  })
}
  // res.json(booksData)
})

app.get("/books/:id", (req, res) => {
  // const { id } = request.params 
  const id = req.params.id
  // const singleBook = booksData.filter((item) => item.bookID === Number(id))
  const singleBookID = booksData.find((book) => {
    return book.bookID === Number(id)
  })

  if (singleBookID) {
    res.status(200).json({
      success: true,
      message: "Book found",
      body: {
        book: singleBook,
      }
    })
  } else {
    res.status(404).json({
      success: false,
      message: "Book not found",
      body: {}
    })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
