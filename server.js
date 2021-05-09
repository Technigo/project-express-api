import express from 'express'
import listEndpoints from 'express-list-endpoints'
import cors from 'cors'
import sandemoData from './data/sandemo.json'




// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here

//endpoint to get all the movie titles

app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

app.get('/books', (req, res) => {

  const { character } = req.query

  if (character) {

  const characterOfBook = sandemoData.filter(book => book.main_characters.toLowerCase().includes(character.toLowerCase()))
 
  res.json(characterOfBook) 
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
  let titleOfBook = sandemoData.find(item => item.title.toLowerCase() === title.toLowerCase())
  if (titleOfBook.length !== 0) {
    res.json(titleOfBook)
  } else {
    {
      res.status(404).send('No book with this title found')
    }
  }

  
})

app.get('/release/:release', (req, res) => {
  const { release } = req.params
  const releaseYear = req.query.id
  let yearOfBook = sandemoData.filter((item) => item.release_year === +release)
  if (yearOfBook.length !== 0) {
    res.json(yearOfBook)
  } else {
    res.status(404).send('No books released this year can be found')
  }

 
})

app.get('/series/:series', (req, res) => {
  const { series } = req.params
  const requiredSerie = req.query.id
  let serieOfBook = sandemoData.filter(item => 
    item.series.toLowerCase().replace(/\s+/g, '') === series.toLowerCase())
  if (serieOfBook.length !== 0) {
    res.json(serieOfBook)
  } else {
    res.status(404).send('No serie with this name could be found')
  }
})


// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
