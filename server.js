import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import sandemoData from './data/sandemo.json'


// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
// 
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

//endpoint to get all the movie titles
app.get('/books', (req, res) => {
  res.json(sandemoData)
})

app.get('/books', (req, res) => {
  const { character } = req.query
  if (character) {
    const characterList = sandemoData.filter(book => book.main_character.includes(character))
    res.json(characterList)
  }
  res.json(sandemoData)
})

app.get('/books/:id', (req,res) => {
  const { id } = req.params
  let book = sandemoData.find( book => book.bookID === +id)
  if (!book) {
    res.status(404).send('No book with this id found')
  }
  res.json(book)
})



app.get('/title/:title', (req, res) => {
  const { title } = req.params
  const bookTitle = req.query.id
  let titleOfBook = sandemoData.filter((item) => item.title === title)

  res.json(titleOfBook)
})

app.get('/release/:release', (req, res) => {
  const { release } = req.params
  const releaseYear = req.query.id
  let yearOfBook = sandemoData.filter((item) => item.release_year === +release)

  res.json(yearOfBook)
})


// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
