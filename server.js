import express from "express";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
 import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";
//import members from "./data/technigo-members.json"

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

app.get('/titles', (req, res) => {
  res.status(200).json(netflixData)
})

app.get('/titles/:title', (req, res) => {
  const movieTitles = netflixData.find(data => data.title === req.params.title)

  res.status(200).json(movieTitles)
})

app.get('/movies', (req, res) => {
  const movies = netflixData.filter(movie => movie.type === 'Movie')

  res.status(200).json(movies)
})

app.get('/movies/:title', (req, res) => {

  const { title } = req.params

  const movieByName = netflixData.find(movie => movie.type === 'Movie' && movie.title === title)

  if (!movieByName) {
    res.status(404).json('Not found') 
  } else {
    res.status(200).json(movieByName)
  } 

  res.status(200).json(movieByName)
})

app.get('/tvshows', (req, res) => {
  const tvShows = netflixData.filter(show => show.type === 'TV Show')

  res.status(200).json(tvShows)
})

app.get('/tvshows/:title', (req, res) => {

  const { title } = req.params

  const tvShowByName = netflixData.find(show => show.type === 'TV Show' && show.title === title)

  if (!tvShowByName) {
    res.status(404).json('Not found') 
  } else {
    res.status(200).json(tvShowByName)
  }  
})

// // Start defining your routes here
// app.get("/", (req, res) => {
//   res.send("Hello Technigo!");
// });

// app.get('/members', (req, res) => {
//   //res.json(members)
//   res.status(200).json(members)
// })

// app.get("/members/:name", (req, res) => {
//   const memberByName = members.find(member => member.name === req.params.name)

//   res.status(200).json(memberByName)
// })

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
