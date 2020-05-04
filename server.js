import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'


// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
import booksData from './data/books.json'
//import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8088
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

//Start defining your routes here
app.get('/', (req, res) => {
  res.send('Endpoints:  /books, /titles, /books/:id, /ratings, authors/:author')
})

//List all the books in the api
app.get('/books', (req, res) => {
  res.json(booksData)
})

//Show one book using an :id as a placeholder for the bookID number in the data
app.get('/books/:id', (req, res) => {
  const { id } = req.params
  const bookId = booksData.find((item) => item.bookID === +id)
  if (bookId) {
    res.json(bookId)
  } else {
    res.status(404).json({ message: 'Not found' })
  }
})

//Query for title 
app.get('/titles', (req, res) => {
  const title = req.query.title
  let bookTitle = booksData.find((item) =>
    item.title.toString().toLowerCase().replace('%20', ' ').includes(title))

  if (bookTitle) {
    res.json(bookTitle)

  } else {
    res.status(404).json({ message: 'Book title not found' })
  }
})

//Sort books after rating, highest to lowest 
app.get('/ratings', (req, res) => {
  const bestRated = booksData.sort((a, b) => b.average_rating - a.average_rating);
  res.json(bestRated)
})


//Get all books by one author (example: https://express-book-api-hannaruter.herokuapp.com/authors/rowling)
app.get('/authors/:author', (req, res) => {
  const author = req.params.author;
  const booksByAuthor = booksData.filter((item) =>
    item.authors.toLowerCase().includes(author)
  );
  res.json(booksByAuthor);
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
