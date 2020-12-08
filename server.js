import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Data I want to use to create end points for?
import booksData from './data/books.json';

//Instance of express
const app = express();

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
// PORT=9000 npm start
const port = process.env.PORT || 8081;

// Add middlewares to enable cors and json body parsing
// Cors makes it easier to use the API, allows API's to say where the requests come from.
// bodyParser allows express to read json in post requests
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
// Handler for what should happen when your routes are matched, res
// First end point getting the entire booksData arrat
app.get('/books', (req, res) => {
  res.json(booksData);  
});


// Second endpoint getting a specific book based on the id added to the endpoint. :id is a variable that will be the value the user has specified on the endpoint e.g. 3.
// req, res is callback function
// Use params to get the id/value the user has specified and put that into the bookId variable. We then use that when finding the id in the array by comparing the bookID number in the array with the id the user has specified on the endpoint. 
// "+" on bookId makes the string in to a number.
// Then that bookID element from the erray is translated into json so it's readable on the endpoint.
app.get('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const specificBook = booksData.find((item) => item.bookID === +bookId);
  res.json(specificBook);  
});

app.get('/books/:author', (req, res) => {
  const bookAuthor = req.params.author;                
  console.log({bookAuthor});
  const booksByAuthor = booksData.filter((item) => item.authors.includes(bookAuthor));
  res.json(booksByAuthor);  
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});
