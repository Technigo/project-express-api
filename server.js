import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import booksData from "./data/books.json";


// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
  app.get("/", (req, res) => {
    res.json({
      message: 'This is API for book data endpoints',
      data: listEndpoints(app)
    })
});

//this checks all the endpoints:
app.get('/endpoints', (req, res) => {
  res.send(listEndpoints(app))
})


//get data by book's name and author using query parameters
app.get("/books", (req, res) => {
  const {bookName, bookAuthor} = req.query
  let booksToSend = booksData

  if(bookName) {
    booksToSend = booksData.filter((item) => item.title.toLowerCase().indexOf(bookName.toLowerCase()) !== -1)
  }

  if(bookAuthor) {
    booksToSend = booksToSend.filter((item) => item.authors.toLowerCase().indexOf(bookAuthor.toLowerCase()) !== -1)
  }

  res.json({
    response: booksToSend,
    success:true
  })
  
});

//get book data by id
app.get('/books/id/:bookID', (req, res) => {
  const { bookID } = req.params;
  console.log(req)
  const bookById = booksData.find((item) => item.bookID === +bookID);

  if (!bookById) {
    res.status(404).send('No book found!')
  };
  
  res.json(bookById);
})

//get bbok data by name
app.get('/books/name/:bookName', (req, res) => {
  const { bookName } = req.params
  const bookByName = booksData.find((item) => item.title.toLowerCase() === bookName.toLowerCase())

  if(!bookName) {
    res.status(404).json({
      response: 'No book found with that name',
      success: false
    }) 
  } else {
    res.status(200).json({
      response: bookByName,
      success: true
    }) 
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});