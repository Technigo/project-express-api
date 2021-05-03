import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import booksData from './data/books.json'

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
  res.send(
    `
      This API provides detaliled information about books. <br>
      Please specify an endpoint or a query. <br>
      Available Endpoints: /books or /id/(id) <br>
      Sample Query:
    `)
})
app.get('/books', (req, res) => {
  res.json(booksData)
})

app.get('/id/:id', (req, res) => {
  const { id } = req.params
  const filteredId = booksData.filter((item) => item.bookID === +id)
  res.json(filteredId)
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
