import express from "express"
import cors from "cors"

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
import booksData from "./data/books.json"
import res from "express/lib/response";
import { resolveShowConfigPath } from "@babel/core/lib/config/files";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello, here is an api of random famous books")
})

//query example in browser http://localhost:8080/books?title=galaxy&author=douglas adams&id=377
app.get("/books", (req, res) => {
  const { id, author, title } = req.query
  
  let allBooks = booksData
  
  if (id) {
    allBooks = allBooks.filter((book) => book.bookID === +id)
  }
  if (author) {
    allBooks = allBooks.filter((book) => 
    book.authors.toLowerCase()
    .includes(author.toLowerCase()))
    // book.authors.toLowerCase() === author.toLowerCase())
  }

  if (title) {
    allBooks = allBooks.filter((book) => 
    book.title.toLowerCase()
    .includes(title.toLowerCase()))
  }

  res.status(200).json ({
    data: allBooks,
    success: true,
  })
})

app.get("/books/id/:id", (req, res) => {
  const { id } = req.params

  const bookById = booksData.find((book) => book.bookID === +id);
  
  if (bookById) {
    res.status(200).json({
      data: bookById,
      success: true,
    });
  } else {
    res.status(404).json({
      data: "Book not found",
      success: false,
    })
  }
})

app.get("/books/author/:author", (req, res) => {
  const { author } = req.params

  const bookByAuthor = booksData.filter((book) => 
  book.authors.toLowerCase()
  .includes(author.toLowerCase()))
  //  === author.toLowerCase())
  
  if (bookByAuthor) {
    res.status(200).json({
      data: bookByAuthor,
      success: true,
    })
  }
})

app.get("/books/title/:title", (req, res) => {
  const { title } = req.params

  const bookByTitle = booksData.filter((book) => 
  book.title.toLowerCase()
  .includes(title.toLowerCase()))
  
  if (bookByTitle) {
    res.status(200).json({
      data: bookByTitle,
      success: true,
    })
  }
})



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
