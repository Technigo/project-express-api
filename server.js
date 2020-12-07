import express, { response } from 'express'
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
const app = express() // a variable that allows us to create a server

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
// accepting get requests to this endpoint, / means no path after the address
app.get('/', (request, response) => {
  response.send('Hello world')
})

// return whole book array
app.get('/books', (request, response) => {
  response.json(booksData);
})

//returns one book based on ID
app.get('/books/:id', (request, response) => {
  const bookId = request.params.id;
  const book = booksData.find(book => book.bookID === +bookId);
  response.json(book);
})


// returns filtered array based on rating
app.get('/rating/:rating', (request, response) => {
  const choosenRating = request.params.rating;
  let ratedArray = booksData.filter((book) => book.average_rating <= +choosenRating);

  response.json(ratedArray)
})

// returns books by a choosen author
app.get('/author/:author', (request, response) => {
  const author = request.params.author;
  const booksByAuthor = booksData.filter((book) => book.authors === author)

  response.json(booksByAuthor)
})

// returns the ten books with highest rating
app.get('/top/:number', (request, response) => {
  const number = request.params.number;
  const sortedBooks = [...booksData];
  sortedBooks.sort((a, b) => b.average_rating - a.average_rating)
  const topTenBooks = sortedBooks.slice(0, number);

  response.json(topTenBooks)
})

// filtrera information ? blir mer än en i resultat
// app.get('/users', (request, response) => {
//   const { name } = request.query;
//   if (name) {
//     const filteredUsers = users.filter((user) => user.name === name)
//     response.json(filteredUsers)
//   } else {
//     response.json(users)
//   }
// })

// hitta en user
// app.get('/users:id', (request, response) => {
//   const { id } = request.params.id;
//   const user = users.find(user => user.id === +id);
//   response.json(user)
// })



// Start the server
app.listen(port, () => {
  // the server has started, what should it do now?
  console.log(`Server running on http://localhost:${port}`)
})
