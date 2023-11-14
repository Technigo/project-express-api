const express = require("express")
const listEndPoints = require("express-list-endpoints")
import cors from "cors";
// import books from "./data/books.json"
import topBooks from "./data/100-trending-books.json"
//https://www.kaggle.com/datasets/anshtanwar/top-200-trending-books-with-reviews


// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8081;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
//app.use(bodyParser.json()) Damen hade detta i sitt exempel?? 

// Start defining your routes here
app.get("/", (req, res) => {
  res.send(listEndPoints(app));
});

app.get("/books", (req, res) => {
  res.json(topBooks)
})

app.get('/:rank', (req, res) => {
  const rank = req.params.rank

  if (isNaN(rank)) {
    res.status(400).send("Invalid rank parameter")
    return
  }

  // Fetch the book with the matching ID from the database or array
  const book = topBooks.find(book => book.Rank === parseInt(rank))
  // Fetch the book with the matching ID from the database or array
  if(book) {
    res.json(book) 
  } else {
    res.status(404).send("Book not found")
  }

})

app.get("/author/:authorName", (req, res) => {
  const authorName = req.params.authorName
  //Filter books by the provided author name
  const booksByAuthor = topBooks.filter(b => b.author.toLowerCase() === authorName.toLowerCase())
  if (booksByAuthor.length > 0) {
         res.json(booksByAuthor);
       } else {
         res.status(404).send('Books by the specified author not found');
       }
})

app.get("/genre/:genre", (req, res)=> {
     const requestedGenre = req.params.genre.toLowerCase()
     const requestedRating = req.query.rating

     let booksInGenre = topBooks.filter(
      (item) => item.genre.toLowerCase().split(', ').includes(requestedGenre))

      if(requestedRating) {
        //Filter by rating if the rating query parameter is present
        const minRating = parseFloat(requestedRating)
        booksInGenre = booksInGenre.filter(item => item.rating >= minRating)
      } 
     
      if(booksInGenre.length > 0) {
        res.json(booksInGenre)
      } else {
        res.status(404).send(`Books in the specified genre "${requestedGenre}" not found`);
      }
  })

  //http://localhost:8081/genre/fantasy?rating=4.9


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


app.route('/')
  .all(function namedMiddleware(req, res) {
    // Handle request
  })
  .get(function(req, res) {
    // Handle request
  })
  .post(function(req, res) {
    // Handle request
  });
