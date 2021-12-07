import express from 'express' //node framework -to create the backend-server
import cors from 'cors'
import booksData from './data/books.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080 //fundamental settings
const app = express() //intiating the express app

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

const users = [
  { id: 1, name: 'Alice', age: 33 },
  { id: 2, name: 'Bob', age: 23 },
  { id: 3, name: 'Chris', age: 3 },
  { id: 4, name: 'Daniela', age: 67 },
]

// This is our first endpoint //if remove this we get "Cannot GET response in browser" it's built in by express. The server is running but there aren't any information.
app.get('/', (req, res) => { //This app.get method takes two arguments: path and maybe users or movies. //The second argument is a call back function that communicates with the front end. 
  //The request req) is handling what the frontend sends to the backend. The response (res) is what the backend send to the front end.
  res.send('Hello from Rosanna!')
})

// get a list of users
app.get('/users', (req, res) => {
  res.json(users)
})

// get a list of the companies with fundings (from json file)
app.get('/books', (req, res) => {
  res.json(booksData)
})

// get a specific book based on its id, using param
app.get('/books/:bookid', (req, res) => {
  const { bookid } = req.params

  const book = booksData.find(book => book.bookID == bookid)

  if (!book) {
    res.status(404).send('No book found with that id')
  } else {
    res.json(book)
  }
})


// get a specific rating on book higher then route parameter
app.get('/books3/:rating', (req, res) => {
  const { rating } = req.params

  const books = booksData.filter(book => book.average_rating >= rating)

  if (!books) {
    res.status(404).send('No book found with that id')
  } else {
    res.json(books)
  }
})


//Remember to use terminal and Postman A LOT!!!
//nodemon makes the server listen to changes like a liveserver

// Start the server 
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port} ROSANNA TEST`)
})
