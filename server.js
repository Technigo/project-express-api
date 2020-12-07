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
// a variable that will allow us to create a server.
// listens to incoming changes on a port ( in this case port 8080), the port is open for communication.
// reason for 8080: similar to 80 which was default for http before https
// (look upp commonly reserved ports on google.)
// express is responsible for creating endpoints
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
// req is incoming(we don't change it), the res is outgoing(we do change it)
app.get('/', (req, res) => {
  //Before the send we can write what ever we want here.
  //For example:
  //-Database connections
  //-Complicated operations
  //-Data lookup
  //-Third party API-requests

  // simple: send something back without checking the request:
  res.send('Hello world')
})

//Gets all the books from books.json:
app.get('/books', (req, res) => {
  res.json(booksData)
})

// Gets books in a specified language:
// language_code: eng, fre, en-US, spa, en-GB, mul, ger
app.get('/language/:language', (req, res) => {
  //get the variable out of the url: the language-placeholder
  //(:language) becomes rec.params.language
  const language = req.params.language
  const showLanguage = booksData.filter((item) => item.language_code === language)
  //http://localhost:8080/language/fre 
  //How do I conditionally render the response to show a message if /:language !== item.language_code???
  res.json(showLanguage)
})


//Gets all books with a high avg. rating (3,5-5):
//app.get('/books/high-rated')

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
