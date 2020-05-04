import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import booksData from './data/books.json'

const port = process.env.PORT || 8080;
const app = express();

app.use(cors())
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.send('Books')
})

app.get('/library', (req, res) => {
  res.json(booksData)
})

app.get('/title/:title', (req, res) => {
  const title = req.params.title
  let specificBookTitle = booksData.filter((item) => item.title.toString().toLowerCase().includes(title.toLowerCase()))
 
  if (specificBookTitle.length < 1) {
    res.send('Could not find any books with that title')
  } else {
    res.json(specificBookTitle)
  }
})

app.get('/author/:author', (req, res) => {
  const author = req.params.author
  let booksFromAuthor = booksData.filter((item) => item.authors.toLowerCase().includes(author.toLowerCase()))
  
  if (booksFromAuthor.length < 1) {
    res.send('Could not find any author by that name')
  } else {
    res.json(booksFromAuthor)
  }
})

app.get('/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn
  let specificBook = booksData.filter((item) => item.isbn === +isbn)
  
  if (specificBook.length < 1) {
    res.send('Could not find the requested book')
  } else {
    res.json(specificBook)
  }
})

app.get('/isbn13/:isbn13', (req, res) => {
  const isbn = req.params.isbn13
  let specificBook = booksData.filter((item) => item.isbn13 === +isbn)
  
  res.json(specificBook)

  if (specificBook.length < 1) {
    res.send('Could not find the requested book')
  } else {
    res.json(specificBook)
  }
})

app.get('/ratings/:rating/:page', (req, res) => {
  const rating = req.params.rating
  const page = +req.params.page - 1
  let averageRating = booksData.filter((item) => item.average_rating >= +rating)
  let showPage = averageRating.slice(page*20, page*20+20)

  if (showPage.length < 1 ) {
    res.send('No books to show')
  } else {
    res.json(showPage)
  }
})

app.get('/reviews/:reviews/:page', (req, res) => {
  const reviews = req.params.reviews
  const page = +req.params.page - 1
  let numberOfReviews = booksData.filter((item) => item.ratings_count >= +reviews)
  let showPage = numberOfReviews.slice(page*20, page*20+20)

  if (showPage.length < 1 ) {
    res.send('No books to show')
  } else {
    res.json(showPage)
  }
})

app.get('/pages/:numpages/:page', (req, res) => {
  const numpages = req.params.numpages
  const page = +req.params.page - 1
  let numberOfPages = booksData.filter((item) => item.num_pages <= +numpages)
  let showPage = numberOfPages.slice(page*20, page*20+20)

  if (showPage.length < 1 ) {
    res.send('No books to show')
  } else {
    res.json(showPage)
  }
})


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
