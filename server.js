import express, { response } from "express";
import cors from "cors";
import netflixData from "./data/netflix-titles.json";


// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
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
  res.send({
    "Netflix API": "You can serch for movie/show, title or ID",
    Routes: [
      {
        "/movies": "Get all movies",
        "/show": "Get all shows",
        "/titles/:id": "Get a show or movie by the ID",
        "/titles/name/:title": "Filter the movies/show for the title",
      },
    ],
  })
});

app.get("/movies", (req, res) => {
  const moviesList = netflixData.filter((movie) => movie.type === "Movie")

  if (!moviesList){
    res.status(404).json({
      message: 'Sorry, we no have movies for now. Try another day!',
      error: 404}) 
  } 

  res.status(200).json(moviesList) 
})

app.get("/shows", (req, res) => {
  const showsList = netflixData.filter((show) => show.type === "TV Show")

  if (!showsList){
    res.status(404).json({
      message: 'Sorry, we no have any show for now. Try another day!',
      error: 404}) 
  } 

  res.status(200).json(showsList) 
})

app.get("/titles/:id", (req, res) => {
  const { id } = req.params
  const showInfoId = netflixData.filter((show) => show.show_id === +id)
  if (showInfoId.length === 0){
    res.status(404).send({
      message: "showId not found, try another ID",
      error: 404})
  } else {
    res.status(200).json(showInfoId)

  }
});

app.get("/titles/name/:title", (req, res) => {
  const { title } = req.params
  const showInfoTitle = netflixData.filter((show) => show.title.toLowerCase().includes(title.toLowerCase()))
  if (!showInfoTitle) {
    res.status(404).json({
      message: 'Sorry, no show/film with that name. Try another',
      error: 404}) 
  }

  res.status(200).json(showInfoTitle) 
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
