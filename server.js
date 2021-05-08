import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
import booksData from './data/books.json'
/* import netflixData from './data/netflix-titles.json' */
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

app.get('/', (req,res) =>{
  res.send(listEndpoints(app))
})


// Start defining your routes here
app.get('/books', (request, response) => {
  const { author } = request.query
  if (author) {
    const authorList = booksData.filter(item => item.authors.includes(author))
    response.json(authorList)
  }
  response.json(booksData)
}) 

// Endpoint to get one book
app.get('/books/:id', (request, response) => { 
  console.log(request.params)
  const { id } = request.params
  const book = booksData.find(book => book.bookID === +id)
  if (!book) {
    response.status(404).send(`Sorry, we couldn´t find the book with id: ${id}!`)
  }
response.json(book)
}) 

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})