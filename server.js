import express from 'express'
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
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Welcome to Books API')
})



app.get('/books', (req, res) => {
  const {authors, title} = req.query;
  if (authors) {
    const filteredAuthors = booksData.filter(item => item.authors.includes(authors))
    res.json(filteredAuthors)
  } else if (title)  {
    const filteredTitles = booksData.filter(item => item.title.toString().includes(title))
    res.json(filteredTitles)
  }
  else { 
    res.json(booksData)
  }
})

app.get('/books/:id', (req, res) => {
  const {id} = req.params;
  console.log(id)
  res.json(booksData.find(item => item.bookID === +id))
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
