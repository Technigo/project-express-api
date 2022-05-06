import express from "express"
import cors from "cors"

import books from "./data/books.json"

// Defines the port the app will run on. Defaults to 8080
// PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())


// --------------- ROUTES ---------------- //
app.get("/", (req, res) => {

  const LandingPage = {
    Welcome:
    "This is an open API with 500 book reviews.",
    Routes: [
      {
          "/books": "All the books",
          "/books/:title": "The specific title of the book",
          "/books/top-rated": "How the books are rated, from highest to lowest rated books",
          "/books/book/:bookID": "The specific bookID",
          "/random-book": "A random book",
      }
    ]
  }
  res.send(LandingPage)
})

// All the books
app.get('/books', (req, res) => {
res.status(200).json({
  data: books,
  success: true,
})
})

// Titles
app.get('/books/:title', (req, res) => {
  const { title } = req.params

  const booksTitle = books.filter(
    (books) => books.title.toLowerCase() === title.toLowerCase())

    if (!booksTitle) {
      res.status(404).json({
        data: "Not found",
        success: false,
      })
    } else {
      res.status(200).json({
        data: booksTitle,
        success: true,
    })
    }
})

// Res: shows top rated to lowest rated
// Using slice() to show top 10 out of all rated books
app.get('/books/top-rated', (req, res) => {
  const bookRating = books.sort(
    (a, b) => b.average_rating - a.average_rating
  )
  res.json(bookRating.slice(0, 50))
})

// :bookID = param to trigger a param example console(req params)
// Will look for a specific param, in this case a specific ID from books
app.get('/books/book/:bookID', (req, res) => {
const { bookID } = req.params
const { book } = books.find((item) => item.bookID === +bookID)

if (!book) {
  res.status(404).json({
    data: `Error, there is no book with book-ID ${bookID}`,
    success: false,
  }) 
} else {
    res.status(200).json({
      data: bookID,
      success: true,
    })
  }
})

// Random book
app.get('/random-book', (req, res) => {
    const randomBook = books[Math.floor(Math.random() * books.length)]
    if (!randomBook) {
        res.status(400).json({
              response: `There are no books with id number`,
              success: false,
        })
    } else {
      res.status(200).json({
          response: randomBook,
          success: true,
      })
    }

})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
