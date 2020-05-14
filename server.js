import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import data from './data/books.json'

//   Any port but 8080 is the default
const port = process.env.PORT || 8080
const app = express()


// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Try /books')
})

// 20 result per page
//books?page=2
app.get('/books', (req, res) => {
  let page = req.query.page ?? 1
  const pageSize = 20
  const maxPage = Math.ceil(data.length/pageSize)
  page = (page<=maxPage && page>=1)?page : 1;
  const startIndex = (page -1) * pageSize 
  const endIndex = startIndex + pageSize
  const resultPage = data.slice(startIndex, endIndex)
  const result = {numBooks: resultPage.length, 
  page : page,
  maxPage: maxPage,
  books: resultPage}
  res.json(result)
})

app.get('/books/id/:id', (req, res) => {
  const id = req.params.id
  const book = data.find((item)=>item.bookID == id)
  if (book) {
  res.json(book)
  }
  else {
    res.status(404).json({error:"book not found"})
  }
})

app.get('/books/authors/:author', (req, res) => {
  const author = req.params.author
  const booksAuthor = data.filter((item)=>item.authors === author)
  if (booksAuthor) {
    res.json(booksAuthor)
  }
  else {
    res.status(404).json({error:"book not found"})
  }
  
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
