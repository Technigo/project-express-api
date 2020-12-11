import express, { response  } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import booksData from './data/books.json'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
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
app.get('/', (request, response) => {
  response.send('Hello world');
});


app.get('/books', (request, response) => {
  response.json(booksData);
});


app.get('/books/book/:bookID', (request, response) => {
  const bookID = request.params.bookID;
  const book = booksData.find((item) => item.bookID === +bookID);

  if (!book) {
    response.send('Could not find this book due to incorrect ID!')
  };
  
  response.json(book);
});


app.get('/rating/:rating', (request, response) => {
  const choosenRating = request.params.rating;
  let ratedBooks = booksData.filter((book) => book.average_rating <= +choosenRating);

  response.json(ratedBooks);
});


app.get('/author/:author', (request, response) => {
  const author = request.params.author;
  const authorLiterature = booksData.filter((item) => item.authors.includes(author));

  if (authorLiterature.length === 0) {
    response.send('No literature available by this name!');
  };
  
  response.json(authorLiterature);
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
}); 

