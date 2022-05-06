import express, { request, response } from "express";
import cors from "cors";
import books from "./data/books.json";
import res from "express/lib/response";


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
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send(
    {"Welcome to the ultimate BOOK REVIEW LIST!":  [
{
      "books": "All books available", 
      "/books/title/:title": "Search for book by specific title",
      "/books/authors/:authors": "Search for book/books written by specific author (alone or with others)",
      "/books/language_code/:language_code": "Search for books available in specific language",
    }
    ]
  } );
});

//All books available
app.get("/books", (req, res) => {
  res.status(200).json({
    data: books,
    success: true,
  });
  });

//Search for book by specific title
app.get("/books/title/:title", (req, res) => {
  const { title } =req.params;
  
  const bookByTitle = books.find((book ) => book.title=== title);
  
  if (!bookByTitle){
    res.status(200).json({
      data: "Succesful search, but that book title is not available here.",
      success: false
    });
  } else {
    res.status(200).json({
      data: bookByTitle, 
      success: true,
  });
  }
  });

  //Search for book/books written by specific author (alone or with others)

  app.get('/books/authors/:authors', (req, res) => {
    const { authors } = req.params;
  
    let filteredAuthor = books;
  
    if (authors) {
  filteredAuthor = filteredAuthor
  .filter((item) => item.authors.toLowerCase().includes(authors.toLowerCase()));
    };
    if (filteredAuthor.length ===0) {
      res.status(200).json({
        data: "Successful search, but no books available by this author",
        success: false,
      });
    } else {
      res.status(200).json({
        data: filteredAuthor,
        success: true,
      });
    };
    });

    //Search for books available in specific language
    app.get('/books/language_code/:language_code', (req, res) => {
      const { language_code } = req.params;
    
      const booksByLanguage = books.filter(
        (book) => book.language_code.toLowerCase () === language_code.toLowerCase()
        );
    
        if (booksByLanguage && booksByLanguage.length !== 0){
          res.status(200).json({
            data: booksByLanguage, 
            success: true,
          });
        } else if (booksByLanguage.length === 0) {
          res.status(200).json({
            data: "Successful response, but this library has no books in required language available.",
            success: true
        });
        } else {
          res.status(404).send({
            data: "Not found",
            success: false
          });
        }
      });
  

  




/* const { language_code, authors } = req.query;

let allBooks = books;

if (language_code) {
  allBooks = allBooks.filter(
    (item) => item.language_code.toLowerCase() === language_code.toLowerCase() 
  );
}

if (authors) {
  allBooks = allBooks.filter(
    (item) => item.authors.toLowerCase() === authors.toLowerCase()
  );
}

if (!allBooks.length) {
response
.status(404)
.json ("sorry");
} else {
  res.status(200).json({
    data: allBooks,
    success: true,
  });
}
});
 */
//Endpoint 1: Searching for a specific  book title




  //Endpoint 2: Searching for books written by a specific author (alone or with authors)



  //Endpoint 3: Searching for all books in  a specific language

 







 /*  app.get('/books/authors/:authors', (req, res) => {
    const { authors } = req.params;
  
    const booksByAuthor = books.filter(
      (book) => book.authors.toLowerCase() === authors.toLowerCase()
      );
  
    if (booksByAuthor && booksByAuthor.length !== 0){
      res.status(200).json({
        data: booksByAuthor, 
        success: true,
      });
    } else if (booksByAuthor.length === 0) {
      res.status(200).json({
        data: "Succesful search, but there are no books written by that author available here.",
        success: true
    });
    } else {
      res.status(404).send({
        data: "Not found",
        success: false
      });
    }
  }); */








    
/*   const { title, authors } = req.query;

  let allBooks = books;

  if(authors) {
    allBooks =allBooks.filter((book) => book.authors.toLowerCase() === authors.toLowerCase()
    );
  }

  if (title) {
    allBooks =allBooks.filter((book) => book.title.toLowerCase() === title.toLowerCase()
    );
  }

res.status(200).json({
  data: allBooks,
  success:true,
});
}); */

//First route "title"



//Second route "authors"



//Third route "language_code"



//Fourth route "average_rating"

app.get('/books/text_reviews_count/:text_reviews_count', (req, res) => {
  const { text_reviews_count } = req.params;

  const booksByReviews= books.filter(
    (book) => book.text_reviews_count === text_reviews_count
    );

  if (booksByReviews !== booksByReviews.length){
    res.status(404).json({
      data: "Not found",
      success: false
    });
  } else {
    res.status(200).json({
      data: booksByReviews, 
      success: true,
  });
  }

});





// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
