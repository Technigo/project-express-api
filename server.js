import express, { response } from 'express';
import cors from 'cors';
import netflixData from './data/netflix-titles.json';

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
const listEndpoints = require('express-list-endpoints')

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get('/', (req, res) => {
  res.json(listEndpoints(app))
});

// All titles 
app.get('/titles', (req, res) => {
  const { page, size } = req.query
  let titles = netflixData

  const pageHits = size ? parseInt(size) : 20
  const pageNumber = page ? parseInt(page) : 1

  const startIndex = (pageNumber - 1) * pageHits
  const endIndex = startIndex + pageHits

  const pageTitles = titles.slice(startIndex, endIndex)

  if (pageTitles.length) {
    res.status(200).json({
      success: true,
      message: 'OK',
      body: {
        netflixTitles: pageTitles
      }
    })
  } else {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      body: {}
    })
  }
})

// Movie category
app.get('/titles/movies', (req, res) => {
  const { year } = req.query
  let movies = netflixData.filter(item => item.type === 'Movie')

  if (year) {
    movies = movies.filter((releaseYear) => {
      return releaseYear.release_year === Number(year)
    })

  }
  if (movies.length) {
    res.status(200).json({
      success: true,
      message: 'OK',
      body: {
        netflixMovies: movies
      }
    })
  } else {
    res.status(404).json({
      success: false,
      message: 'No Movie titles released this year',
      body: {}
    })
  }
})

// Tv show category
app.get('/titles/tv-shows', (req, res) => {
  const tvShows = netflixData.filter(item => item.type === 'TV Show')
  if (tvShows) {
    res.status(200).json({
      success: true,
      message: 'OK',
      body: {
        netflixTvShows: tvShows
      }
    })
  } else {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      body: {}
    })
  }
})


app.get('/titles/genres/:genres', (req, res) => {
  const { genres } = req.params
  let genresSearch = netflixData.filter(item => item.listed_in.toLowerCase().includes(genres.toLowerCase()))

  if (genresSearch.length) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        netflixTitles: genresSearch
      }
    })
  } else {
    res.status(404).json({
      success: false,
      message: 'Genre not found',
      body: {}
    })
  }
})

app.get('/titles/country/:country', (req, res) => {
  const { country } = req.params
  let countrySearch = netflixData.filter(item => item.country.toLowerCase().includes(country.toLowerCase()))

  if (countrySearch.length) {
    res.status(200).json({
      success: true,
      message: 'OK',
      body: {
        netflixTitles: countrySearch
      }
    })
  } else {
    res.status(404).json({
      success: false,
      message: 'Country not found',
      body: {}
    })
  }
})

app.get('/titles/:id', (req, res) => {
  const { id } = req.params
  const singleTitle = netflixData.find((title) => {
    return title.show_id === Number(id)
  })
  if (singleTitle) {
    res.status(200).json({
      success: true,
      message: 'OK',
      body: {
        titles: singleTitle
      }
    })
  } else {
    res.status(404).json({
      success: false,
      message: 'Title id not found',
      body: {}
    })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
