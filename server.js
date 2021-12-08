import express from "express";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
// import goldenGlobesData from "./data/golden-globes.json";
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
import netflixData from "./data/netflix-titles.json";
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello world");
});

// a function in which express passes two arguments.
// req handles what frontend sends to backend
// what backend sends back to frontend
app.get("/titles", (req, res) => {
  res.json(netflixData);
});

app.get("/titles/:show_id", (req, res) => {
  const show = req.params.show_id;
  const showId = req.query.show_id;
  let seeOneShow = netflixData.filter((item) => item.show_id === +show);

  if (showId) {
    seeOneShow = seeOneShow.filter((item) => item.show_id);
  }
  res.json(seeOneShow);
});

app.get("/titles/:release_year", (req, res) => {
  const year = req.params.release_year;
  const showYear = req.query.release_year;
  let ReleaseYear = netflixData.filter((item) => item.release_year === +year);

  if (showYear) {
    ReleaseYear = ReleaseYear.filter((item) => item.release_year);
  }
  res.json(ReleaseYear);
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
