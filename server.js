import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import goldenGlobesData from "./data/golden-globes.json";
console.log(goldenGlobesData);
// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
//
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
  res.send("Hello world");
});
app.get("/nominations", (req, res) => {
  res.json(goldenGlobesData);
});

app.get("/year/:year", (req, res) => {
  const year = req.params.year;
  const showWon = req.query.win;
  console.log("hello", showWon);
  let nominationsFromYear = goldenGlobesData.filter(
    item => +item.year_award === +year
  );

  if (showWon) {
    nominationsFromYear = nominationsFromYear.filter(item => item.win);
  }

  res.json(nominationsFromYear);
});

/* TEST app.get("nomination/:id", (req, res) => { // request result
  const id = req.params.id // requesting the param  id param is everything after the /
  let selectedFilm = goldenGlobesData.find( // looking for the selected film within GGD
    film => film.id_movie === id // comparing id to find right id "film" is a placeholder
  )

}
); */

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// year_film: 2009,
//   year_award: 2010,
//     ceremony: 67,
//       category: "Best Motion Picture - Drama",
//         nominee: "Hurt Locker, The",
//           film: "",
//             win: false
// http://localhost:8080/year/2010/?win=true
