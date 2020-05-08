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
  res.send('It can be a beautiful start!')
})

app.get("/books", (req, res) => {
  res.json(booksData);
});

app.get("/rating/:rating", (req, res) => {
  const bookId = req.params.rating;
  const book = booksData.find(item => item.average_rating.toString() === rating);
  res.json(book);
});

app.get("/language/:language", (req, res) => {
  const language = req.params.language;
  const booksInLanguage = booksData.filter(item => item.language_code === language);
  res.json(booksInLanguage);
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
