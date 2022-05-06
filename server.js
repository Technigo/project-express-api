import express from "express"
import cors from "cors"
import booksData from "./data/books.json"

// This defines that default port for the app to run - but can be overridden. 
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Defining of landingpage routes
app.get("/", (req, res) => {
  const landingPage = {
     Hello: 
     "here is an api of random famous books",
     Routes: [{
       "/books": "Get whole array of books",
       "/books/id/'id number'": "Get unique book by id",
       "/books?id='id number'": "Get unique book by id",
       "/books/author/'name of author": "Get list of books from particular author",
       "/books?author='name of author": "Get list of books from particular author",
       "/books/title/'title of book": "Get books by title",
       "/books?title='title of book": "Get books by title",
     }]
   }
  res.send(landingPage)
})

//Routes with query
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


//Routes with Params
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
