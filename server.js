import express from "express";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
import goldenGlobesData from "./data/golden-globes.json";
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
  res.send("This is Alexander's express API exercise");
});

app.get('/nominations', (req, res) => {
  res.json(goldenGlobesData)
})

app.get('/year/:year', (req, res) => {
  const year = req.params.year
  const showWon = req.query.won
  console.log(showWon)
  console.log({ year })
  let nominationsFromYear = goldenGlobesData.filter((item) => item.year_award === +year)

  if (showWon) {
    nominationsFromYear = nominationsFromYear.filter((item) => item.win)
  }
  res.json(nominationsFromYear)
})

app.get('/ceremony/:ceremony', (req, res) => {
  const ceremony = req.params.ceremony
  console.log({ ceremony })
  console.log(req.params.ceremony)
  const ceremonyNumber = goldenGlobesData.filter((item) => item.ceremony === +ceremony)
  res.json(ceremonyNumber)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
