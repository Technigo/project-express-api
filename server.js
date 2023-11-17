import express from "express";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
import books from "./data/books.json";
console.log(books.length)
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require('express-list-endpoints')

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your RESTful routes here

//Documentation of API
app.get("/", (req, res) => {
  //res.send("Welcome to our book library!  Here you have access to 450 books!\n");
  const endpoints = listEndpoints(app);
  res.json(endpoints)
});

//all books
app.get("/books",(req,response)=>{
response.json(books)
})

//one book based on Id
app.get("/books/:bookId", (req, response)=>{  
  const {bookId}=req.params
  
  //using find() for returning the only item returning true to the function when runned through
  const ID = books.find((book)=>book.bookID===+bookId)
  if(ID){
    response.json(ID)
  }else{
    response.status(404).send("Unfortunately, no such book was found in our library!")
  }
  
})

//Arrays of books based on a searched author -bug(only single author with simple name accepted)
app.get("/books/author/:author", (req, response)=>{
  const {author} =req.params
  const singleAuthor= books.filter((book)=>book.authors.toLowerCase().replace(/ /g,'')=== author.toLowerCase())

  if(singleAuthor.length>0){
    response.json(singleAuthor)
  }else{
    response.status(404).send("Unfortunately, no such author could be found in our library!")
  }
})

//On 01/01/2007 ISBN system switched from a 10-digit long to a 13-digit long format
//To date, a 13-digit ISBN includes 978-prefix, which allowed systems to contain both 10- and 13-digit ASBNs for all books.  However, a 13-digit ISBN starting with 979 does not have an equivalent 10-digit ISBN.  Aim: only 13-digit ISBNs with 978- and 979-prefix should be used to identify a book.
//ISBN agency in an English-speaking region assigns ISBNs starting with 
//either 978-0 or 978-1, or 979-8 (unique to the US)

//one unique book based on International Standard Book Number (ISBN)
app.get("/books/isbn/:isbn13", (req, response)=>{
  const {isbn13} = req.params
  const Isbn13Digits= books.find((book)=>book.isbn13===+isbn13)
  if(Isbn13Digits){
    response.json(Isbn13Digits)
  }else{
    response.status(404).send("Unfortunately, no book with such ISBN was found in our library!")
  }
})

//For librairies using old 10-digit ISBN format, find one unique book:
app.get("/books/oisbn/:isbn10",(req,response)=>{
  const {isbn10}=req.params
  const Isbn10Digits= books.find((book)=>book.isbn===+isbn10)
  if(Isbn10Digits){
    response.json(Isbn10Digits)
  }else{
    response.status(404).send("Unfortunately, this ISBN was not found in our library!  Please try with 13-digit ISBN instead.")
  }
})


// https://stackoverflow.com/questions/494035/how-do-you-use-a-variable-in-a-regular-expression

//Searching filters by:
//---author---
app.get("/author", (req, response)=>{
  
  const authorPattern = req.query.search
  let regex = new RegExp(authorPattern, "gi");
  const matchingAuthor= books.filter((book)=>book.authors.match(regex)!= null)

  if(matchingAuthor.length>0){
    response.json(matchingAuthor)
  }else{
    response.status(404).send("Unfortunately, no such author could be found in our library database!")
  }
})

//----title----

app.get("/bookTitle", (req, response)=>{
  
  const titlePattern = req.query.search
  let regex = new RegExp(titlePattern, "gi");
  const matchingTitle= books.filter((book)=>book.title.match(regex)!= null)

  if(matchingTitle.length>0){
    response.json(matchingTitle)
  }else{
    response.status(404).send("Unfortunately, no such title could be found in our library database!")
  }
})

// https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value

//sorted array for slice method
//Top 10 rated books
app.get("/top10",(req,response)=>{
  const sortedDescendingRatings = books.sort((a, b) => (a.average_rating < b.average_rating) ? 1 : (a.average_rating === b.average_rating) ? ((a.ratings_count < b.ratings_count) ? 1 : -1) : -1 );
  const sliced = sortedDescendingRatings.slice(0,10);
  console.log(sliced.length)
  response.json(sliced)
})

//Bottom 10 rated books
app.get("/bottom10",(req,response)=>{
  const sortedAscendingRatings = books.sort((a, b) => (a.average_rating > b.average_rating) ? 1 : (a.average_rating === b.average_rating) ? ((a.ratings_count < b.ratings_count) ? 1 : -1) : -1 );
  const sliced = sortedAscendingRatings.slice(0,10);
  console.log(sliced.length)
  response.json(sliced)
})

//returning an array of all unique "language_code" values of the database

//use Set to store unique language codes
const uniqueLanguageCodes = new Set (books.map(book=>book.language_code))
//convert Set to array
const uniqueLanguageCodesArray = Array.from(uniqueLanguageCodes)
console.log(uniqueLanguageCodesArray)

app.get("/lang",(req,response)=>{
  const uniqueLanguageCodes = new Set (books.map(book=>book.language_code))
  const uniqueLanguageCodesArray = Array.from(uniqueLanguageCodes)
  if(uniqueLanguageCodesArray.length>0){
    response.json(uniqueLanguageCodesArray)
  }else{
    response.status(404).send("Unfortunately, this ISBN was not found in our library!  Please try with 13-digit ISBN instead.")
  }
})

//filtering new array with selected language
app.get("/books/lang/:lang",(req,response)=>{
  const {lang}=req.params
  const listBooksByLang= books.filter((book)=>book.language_code===lang)
  if(listBooksByLang.length>0){
    response.json(listBooksByLang)
  }else{
    response.status(404).send("Unfortunately, this ISBN was not found in our library!  Please try with 13-digit ISBN instead.")
  }
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
