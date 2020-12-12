import express, { response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import booksData from './data/books.json'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'

// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express() // a variable that allows us to create a server

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
// accepting get requests to this endpoint, / means no path after the address
app.get('/', (request, response) => {
  response.send('Welcome to my books API // Anna Hellqvist 📚')
})

// retrieves the whole books array
app.get('/books', (request, response) => {
  response.json(booksData);
})

//retrieves one book based on ID
app.get('/books/:id', (request, response) => {
  const { id } = request.params;
  const bookFound = booksData.find(book => book.bookID === +id);

  bookFound ? response.json(bookFound) : response.json({ error: 'No book was found' })
})

//------------------------------------------------------------------------------------------------------
// QUERIES

// /authors?author=Bill Bryson returns books by a choosen author
app.get('/authors', (request, response) => {
  const { author } = request.query;
  const booksByAuthor = booksData.filter((book) => book.authors === author)

  response.json(booksByAuthor);
})

// /top-list?list=20 retrieves the 20 books with highest rating
app.get('/top-list', (request, response) => {
  const { list } = request.query;
  const sortedBooks = [...booksData];
  sortedBooks.sort((a, b) => b.average_rating - a.average_rating)
  const topList = sortedBooks.slice(0, list);

  response.json(topList);
})

// /ratings?rating=4 shows books with rating between 4-5, retrieves filtered array based on rating
app.get('/ratings', (request, response) => {
  const { rating } = request.query;

  if (rating < 5) {
    const filteredBooks = booksData.filter((book) => Math.floor(book.average_rating) === +rating);
    response.json(filteredBooks)
  } else {
    response.json({ error: 'No books with that rating were found' })
  }
})

//Query for language ex. /language/lang=en-US
app.get('/language', (request, response) => {
  const { lang } = request.query;
  const filteredLanguage = booksData.filter((book) => book.language_code === lang);
  response.json(filteredLanguage);
})

// empty/dummy endpoints
app.get('/books/:year', (request, response) => {
  // This should return all the books released in a specific year
})

// Start the server
app.listen(port, () => {
  // the server has started, what should it do now?
  console.log(`Server running on http://localhost:${port}`)
})
