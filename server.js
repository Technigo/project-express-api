import express from "express";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
import booksData from "./data/books.json";
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
  
  const EntryPage = {
    Welcome: "Books are the quietest and most constant of friends; they are the most accessible and wisest of counselors, and the most patient of teachers.” ― Charles W",
    Routes: [
      {
        "/booksData": "All books",
        "/booksData/title/:title": "Choose the specific title",
        "/booksData/authors/:authors": "Autors",
      },
    ],
  };
  res.send(EntryPage);
});

app.get('/booksData', (req, res) => {
  res.status(200).json({
    data: booksData,
    success: true,
  })
  })

app.get("/booksData/title/:title", (req, res) => {
  const { title } = req.params;

  const booksByTitle = booksData.filter((book) => book.title.toUpperCase().includes(title.toUpperCase())
    );
      res.status(200).json({
        data: booksByTitle,
        success: true,
    })
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
