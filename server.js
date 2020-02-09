import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import booksData from "./data/books.json"

const port = process.env.PORT || 8080
const app = express()

app.use(cors());
app.use(bodyParser.json())

// Routes
app.get("/", (req, res) => {
  res.send("Books API")
});

app.get("/books", (req, res) => {
  res.json(booksData)
});

app.get("/books/:id", (req, res) => {
  const bookId = req.params.id
  const book = booksData.find(item => item.bookID.toString() === bookId)
  res.json(book)
})

app.get("/language/:language", (req, res) => {
  const language = req.params.language
  const booksByLanguage = booksData.filter(item => item.language_code === language)
  res.json(booksByLanguage)
})

app.get('/sort/rating', (req, res) => {
  const copyBooksData = [...booksData]
  const sortByRating = copyBooksData.sort((a, b) => -(parseFloat(a.average_rating)-parseFloat(b.average_rating)))
  res.json(sortByRating)
})

app.get("/title/:title", (req, res) => {
  const title = req.params.title
  const titleLetter = booksData.filter(book => {
    let bookTitle = book.title.toString()
    return bookTitle.toLowerCase().charAt(0) === title.toLowerCase().charAt(0)
  })
  res.json(titleLetter)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});