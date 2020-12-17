import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import books from './data/books.json'

const port = process.env.PORT || 8000
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hi everyone! Keep reading here: https://express-api-project-horvath.herokuapp.com/')
})

app.get('/books', (req, res) => {
  const { page } = req.query
  const startIndex = 20 * +page
  res.json(books.slice(startIndex, startIndex + 20))
})

app.get('/books/:id', (req, res) => {
  const id = req.params.id
  const bookId = books.filter((item) => item.bookID === +id) 
  res.json(bookId)
  if (bookId) {
    res.json(bookId)
  } else {
    res.status(404).json({ message: 'Sorry, no books found with this id.' })
  }
})

app.get('/books/language/:language', (req, res) => {
  const language = req.params.language
  const booksLanguageCode = books.filter((item) => item.language_code === language)
  res.json(booksLanguageCode)
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})