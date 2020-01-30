import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import booksData from './data/books.json'

/* Sample from API

  "bookID": 1,
  "title": "Harry Potter and the Half-Blood Prince (Harry Potter  #6)",
  "authors": "J.K. Rowling-Mary GrandPré",
  "average_rating": 4.56,
  "isbn": 439785960,
  "isbn13": 9780439785969,
  "language_code": "eng",
  "num_pages": 652,
  "ratings_count": 1944099,
  "text_reviews_count": 26249*/


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

// Path variable/path parameter
app.get('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const book = booksData.filter(item => item.bookID === +bookId);
  console.log("id path parameter");
  res.json(book);
});

// Filter based on title OR authors OR 
app.get('/books', (req, res) => {
  // Query parameter
  const searchString = req.query.search;

  //search is the word you type in the searchfield (betyder att man ska skriva in det ordet i sökfältet såhär: http://localhost:8080/books/?search=Adams)

  let filteredBooks = booksData;

  console.log(booksData)

  if (searchString) {
    // Filter once on multiple fields
  console.log('hej', searchString)  
    filteredBooks = filteredBooks.filter(item => {
      const itemTitle = item.title.toString().toLowerCase();
      const itemAuthors = item.authors.toString().toLowerCase();
      //the text in the searchfield will always be a string (det som står i sökfältet kommer alltid vara en string, när Damien gjorde ett + i texten så var det för att göra sökfältet till en int.)
      console.log(itemTitle)
      return itemTitle.includes(searchString.toLowerCase()) ||
        itemAuthors.includes(searchString.toLowerCase());
    });
  }

  res.json(filteredBooks);
});  

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})