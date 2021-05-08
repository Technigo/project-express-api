import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

import booksData from './data/books.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Send list of all endpoints available in API
app.get('/', (req,res) => {
  res.send(listEndpoints(app))
})

// Endpoint to get all the books
app.get('/books', (req, res) => {
  res.json({ data: booksData })
})   

// Endpoint to get book by author
app.get('/books/:author', (req, res) => {
  // Destructure query params
  const { author } = req.query
  
  // Look for lowercased string from query param inside lowercased string from JSON
  const byAuthor = booksData.filter(book => {
    return book.authors.toLowerCase().includes(author.toLowerCase())
  })
 
  // Return data
  res.json(byAuthor)
});

// Endpoint to get one book
app.get('/books/id/:id', (req, res) => { 
  
  // Destructuring path params
  const { id } = req.params

  // Find book with same id as id from path param  
  const queriedBook = booksData.find(book => book.bookID === +id)

   // Conditionally send different response to client
  if (queriedBook) {
    res.status(200).json({ data: queriedBook })
    } else {
      res.status(404).json({ error: 'Not found' })
    } 
  }) 

 app.get('/books/:title', (req, res) => {
   const { title } = req.query
   if (title) {
     const byTitle = booksData.filter((book) => book.title.toLowerCase().includes(title.toLowerCase()))
     res.json(byTitle)
   } else {
     res.json(booksData)
   }
 })


// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})