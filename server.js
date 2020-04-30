import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import data from "./data/netflix-titles.json";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.json(data);
});

app.get("/IDs/:id", (req, res) => {
  const id = req.params.id;
  const movieWithId = data.filter((item) => item.show_id === +id);

  res.json(movieWithId);
});

app.get("/actors/:actor", (req, res) => {
  const actor = req.params.actor;
  const moviesWithActor = data.filter((item) => item.cast.includes(actor));

  res.json(moviesWithActor);
});

app.get("/years/:year", (req, res) => {
  const year = req.params.year;
  const type = req.query.type;

  let contentFromYear = data.filter((item) => item.release_year === +year);

  if (type) {
    contentFromYear = contentFromYear.filter((item) => item.type === type);
  }

  res.json(contentFromYear);
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
