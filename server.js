import express from "express";
import cors from "cors";

import booksData from "./data/books.json";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
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
  const HomePage = {
    Welcome: "Welcome to the magical world of the written word: hopefully you will find the book you are looking for!",
    Routes: [
      {
        "/booksData": "Time to exercise your brain with a good book.",
        "/booksData/title/:title": "Choose your next book title.",
        "/booksData/authors/:authors": "Find your next book trough your favourite author.",
      },
    ],
  };
  res.send(HomePage);
});


app.get("/booksData", (req, res) => {
  const { title, authors } = req.query;

  let results = booksData;

  if (title) {
    results = results.filter((item) => 
    item.title.toLowerCase().includes(title.toLowerCase()))
  }
  if (authors) {
    results = results.filter((item) => 
      item.authors.toLowerCase().includes(authors.toLowerCase()))
  }
  if (results.length === 0) {
    res.status(404).json({
      data: "Can not find the book you are looking for!",
      sucess: false,
    })
  } else {
    res.json({
      data: results,
      success: true,
    });
  }
});

//Titles
app.get("/booksData/title/:title", (req, res) => {
  const { title } = req.params;

  const bookByTitle = booksData.filter(
    (book) => book.title.toLowerCase().includes(title.toLowerCase())
    );
      res.status(200).json({
        data: bookByTitle,
        sucess: true,
      })
   
});

//Authors
app.get("/booksData/authors/:authors", (req, res) => {
  const { authors } = req.params;

  const booksByAuthors = booksData.filter(
    (book) => book.authors.toLowerCase().includes(authors.toLowerCase())
    );

  res.status(200).json({
    data: booksByAuthors,
    sucess: true,
  })
  
});

//ID:s
app.get("/booksData/:bookID", (req, res) => {
  const { bookID } = req.params;

const bookById = booksData.find((book) => +book.bookID === +bookID);

if (!bookById) {
  res.status(404).json({
    data: `Can not find the book you are looking for with this id: ${bookID}`,
    success: false,
  });
} else {
  res.status(200).json({
    data: bookById,
    success: true,
  });
}

});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
