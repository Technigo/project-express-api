import express from "express";
import cors from "cors";

import books from "./data/books.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const listEndpoints = require('express-list-endpoints')
const app = require('express')();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());


//Start defining your routes here
app.get("/",(req,res) => {
	res.json({
    message: "Welcome to my page, you can find list of API endpoints for book data below",
    reference_link: 'https://github.com/sukiphan97/project-express-api',
    data: listEndpoints(app)
  });
})


//GET DATA FROM QUERY PARAMTERS
.get("/books", (req, res) => {
 
  const { title, authors, page, limit } = req.query;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  let allBooks = books;

  //Search result - To look up books by keywords: title, authors, languages, limited results
  if(title) {
    allBooks = allBooks.filter(item => item.title.toLowerCase() === title.toLowerCase())
  } 
  
  if (authors) {
    allBooks = allBooks.filter(item => item.authors.toLowerCase() === authors.toLowerCase())
  }
   
  if (page && limit) {
    allBooks = allBooks.slice(startIndex, endIndex);

      res.json({
        data: allBooks,
        prev_page: startIndex > 0 ?  +page - 1 : '',
        next_page: endIndex < books.length ? +page + 1 : '',
        limit: limit,
        success: true
      })
  }

  res.json({
    data: allBooks,
    success: true
  });
 
});

//GET BOOK DATA BY ID 
app.get("/books/bookId/:id", (req, res) => {

  const id = +req.params.id;
  const bookId = books.find(book => book.bookID === id);
  
  if(!bookId) {
    res.status(404).json({
      data: 'Sorry, no book found. Please try another id',
      success: false
    })
  }
  res.status(200).json({
    data: bookId,
    success: true
  })
})

//GET HIGH-RATING BOOKS
app.get("/books/highRating", (req,res) => {
  const highRatingBooks = books.filter(book => book.average_rating > 4);

  res.status(200).json({
    data: highRatingBooks,
    success: true
  })
})

//EMPTY ENDPOINTS FOR FUTURE USAGE

 //Return book datas by years
  app.get("/books/year/:year", (req, res) => {
    const year = req.params.year;
    const bookByYear = books.filter(book => book.publish_year === year);

    res.status(200).json({
      data: bookByYear,
      success: true
    })
  })




// START THE SERVER
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
