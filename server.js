import express from "express";
import cors from "cors";

import books from "./data/books.json";
import { parseAsync } from "@babel/core";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());


//Start defining your routes here
app.get("/books", (req, res) => {
 
  const { title, authors, language, page, limit } = req.query;

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

  if (language) {
    allBooks = allBooks.filter(item => item.language_code === language)
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

//Return book datas according to ID 
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

//Return highest rating books
app.get("/books/highRating", (req,res) => {
  const highRatingBooks = books.filter(book => book.average_rating > 4);

  res.status(200).json({
    data: highRatingBooks,
    success: true
  })
})

//Empty endpoint for future usage 

 //Return book datas by years
  app.get("/books/year/:year", (req, res) => {
    const year = req.params.year;
    const bookByYear = books.filter(book => book.publish_year === year);

    res.status(200).json({
      data: bookByYear,
      success: true
    })
  })

  //ADDING REVIEWS TO EXISTING BOOOKS
  app.post("/books/review/:id", (req, res) => {
    
    //Here, we map through the original array and then find the item whose id matches with the param
    const existingBook = books.map(book => {
      if (book.bookID === +req.params.id) {
        return {...book, review: req.body.review}
      } else return book
    });
    
    if(existingBook) {
      res.status(200).json({
        data: existingBook,
        success: true
      })  
    }
  })




// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
