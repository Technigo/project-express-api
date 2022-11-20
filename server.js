import express from "express";
import cors from "cors";
import booksData from "./data/books.json"


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

// listed endpoints here, had to removed it since it crashed app - new try when code is done

// Start defining your routes here
app.get("/", (req, res) => {
  res.send(" Hello go to --> /books ");
});

app.get("/books", (req, res) => {

  const { author, title  } = req.query; //params
  let filteredBooks = booksData;

  if (author) {
    filteredBooks = filteredBooks
    .filter((item) => item.authors.toLocaleLowerCase()
    .includes(author.toLocaleLowerCase()))
  };

  if (title) {
    filteredBooks = filteredBooks
    .filter((item) => item.title.toLocaleLowerCase()
    .includes(title.toLocaleLowerCase()))
  }

  if (filteredBooks.length === 0) {
    res.status(404).json({
      data: "could not find author with that name",
      success: false,
  }); 
  } else {
    res.status(200).json({
      booksData: filteredBooks
    });
  };
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

