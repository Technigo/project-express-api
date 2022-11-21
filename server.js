import express from "express"
import cors from "cors"
import books from "./data/books.json"

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json"
// import booksData from "./data/books.json"
// import goldenGlobesData from "./data/golden-globes.json"
// import netflixData from "./data/netflix-titles.json"
// import topMusicData from "./data/top-music.json"

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get("/", (request, response) => {
  response.json({responseMessage: "Hi there! Type in /books to browse all books, or try /random-book to get a random book recommendation!"})
})

app.get("/books", (request, response) => {
  let { language_code, page = 1 } = request.query
  page = Number(page)


  let booksToReturn = books

  if (language_code) {
    booksToReturn = booksToReturn.filter(b => b.language_code === language_code)
  }

  let booksAfterPagination = []
  const pageSize = 20
  if (page) {
    const start = ((page - 1) * pageSize) 
    const end = start + pageSize
    booksAfterPagination = booksToReturn.slice(start, end)
  }
  const totalCount = booksToReturn.length
  const totalPages = Math.floor(totalCount / pageSize) 

  response.status(200).json({
    success: true,
    message: "OK",
    body: {
      totalCount,
      page,
      pageSize, 
      totalPages,
      nextPage: page < totalPages && `https://project-express-api-6jhpdpxubq-lz.a.run.app/books?page=${page + 1}`,
      previousPage: page > 1 && `https://project-express-api-6jhpdpxubq-lz.a.run.app/books?page=${page - 1}`,
      books: booksAfterPagination
    }
  })
})

app.get("/books/:id", (request, response) => {
  const book = books.find((b) => b.bookID === Number(request.params.id))
  console.log(book)
  if (book) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        book
      }
    })
  } else {
    response.status(404).json({
      success: false,
      message: "Not found",
      description: "Use route /books to list all available books",
      body: {}
    })
  }
})

app.get('/random-book', (req, response) => {
  const book = books[Math.floor(Math.random()*books.length)];
  response.status(200).json({
    success: true,
    message: "OK",
    body: {
      book
    }
  })
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})


/// baseURL = http://localhost:8080
// baseURL?firstQueryParam=FirstQueryParamValue&secondQueryParam=SecondQuesryParamValue&...&nthQueryParam=nthQueryParamValue
// baseURL/pathParamValue?firstQueryParam=FirstQueryParamValue&secondQueryParam=SecondQuesryParamValue&...&nthQueryParam=nthQueryParamValue