import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
import booksData from './data/books.json'
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

//This will send a get-request to /books. 
//It will use a callbackfunction that will
//pass two arguments: the request and the response.
//in the request we could ask for what headers the browser send
//or if it's a postrequest we could get the data of the post-request body.
//Then we have the response object.
//This is ued to start building up the response to send back to the browser.
//We can use the response to add stuff to it (?!).

app.get('/books', (req, res) => {
  res.json(booksData)
})

//This route will return books with a specifik written language
app.get('/lang/:lang', (req, res) => {
  const lang = req.params.lang
  const writtenLang = booksData.filter((item) => item.language_code === lang)
  res.json(writtenLang)
})

//This route will return all books not written in the specified language
app.get('/otherlang/:notlang', (req, res) => {
  const notlang = req.params.notlang
  const otherlang = booksData.filter((item) => item.language_code != notlang)
  res.json(otherlang)
})

//This returns single result of booksearch per ID.
app.get('/books/:book', (req, res) => {
  const book = req.params.book
  const result = booksData.filter((item) => item.bookID == book)
  res.json(result)
})

//This route will return a single book depening on search for title
//Currently using the bookID, but should use title in frontend-search
app.get('/books/:title', (req, res) => {
  const title = req.params.title
  const result = booksData.filter((item) => item.bookID == title)
  res.json(result)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
