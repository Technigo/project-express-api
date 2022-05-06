import express from "express";
import cors from "cors";

// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
 import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";
//import members from "./data/technigo-members.json"


const port = process.env.PORT || 8080;
const app = express();

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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
