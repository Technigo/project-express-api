import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
import booksData from './data/books.json'
console.log(`number of books: ${booksData.length}`)
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
  res.send('Hello world')
})

//to get all books presented in json
//Pagination 
  // 1) How many things are we going to return per page?  
  // 2) How do we know which page to return? 
  // to main things we need to know to create of subset of the data we are returning.
app.get('/books', (req, res) => {
  const { page } = req.query  
  console.log(`page: ${page}`)
  let booksList = booksData;
  console.log(`books = ${booksList}`)
  const pageSize = 20   //calculate the start index will be 0 (0 * 20)
  const startIndex = page * pageSize //calculate and bound the end index will be 20 (0 + 20)
  const endIndex = startIndex + pageSize
  const booksListForPage = booksList.slice(startIndex, endIndex)
  const returnObject = { books: booksListForPage.length, booksListForPage }

  if (booksListForPage.length === 0) {
    res
    .status(404)
    .send({ error: 'Sorry, no books where found, please try a different query' })
  }

  //to see this on localhost type: http://localhost:8080/books/?page=3 
  //change page=3 to any number depending on page you want to view
  res.json(returnObject)

  //STARTED OFF WITH THIS
  // let booksList = booksData
  // res.json(booksList)
 
   // if (average_rate) {
  //   bookListRatings = bookListRatings.filter((item) =>
  //     item.title.toLowerCase().includes(title.toLowerCase())
  //   );
 
})

  

/*** to get one book presented in json based on book id ***/
// Displays book with specific ID
app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  const bookWithId = booksData.find((item) => item.bookID === +id);

  if (!bookWithId) {
    res
      .status(404)
      .send({ error: `No book with id: "${id}" found` });
  }

  res.json(bookWithId);
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
