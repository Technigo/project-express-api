import express, { response } from 'express';
import cors from 'cors';
import netflixData from './data/netflix-titles.json';

// Defines the port the app will run on. Defaults to 8080, but can be overridden
const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require('express-list-endpoints')

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// routes starts here
app.get('/', (req, res) => {
  res.json(listEndpoints(app))
});

// All titles with pages
app.get('/titles', (req, res) => {
  const { page, size } = req.query
  let titles = netflixData

  // hits size and page nr are set to a default value, once queries are changed it will update accordingly  
  const pageHits = size ? parseInt(size) : 50
  const pageNumber = page ? parseInt(page) : 1

  // -1 to to adjust for the fact that array indices start at 0 and the first page number start at 1 
  const startIndex = (pageNumber - 1) * pageHits
  const endIndex = startIndex + pageHits

  const pageTitles = titles.slice(startIndex, endIndex)
  //Math.ceil() to always round up the total amount of pages, so its shown without decimal
  const numberOfPages = Math.ceil(titles.length / pageHits)

  if (pageTitles.length) {
    res.status(200).json({
      success: true,
      message: `You are on page ${pageNumber} out of ${numberOfPages}`,
      body: {
        netflixTitles: pageTitles
      }
    })
  } else {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      body: {}
    })
  }
})

// Movie category, with query param for year
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
      message: 'Not found',
      body: {}
    })
  }
})

// Tv show param, with queries for year, seasons, genres
app.get('/titles/tv-shows', (req, res) => {
  const { year, seasons, genres } = req.query
  let tvShows = netflixData.filter(item => item.type === 'TV Show')

  if (year) {
    tvShows = tvShows.filter((item) => {
      return item.release_year === Number(year)
    })
  }
  if (seasons) {
    tvShows = tvShows.filter((item) => {
      return item.duration === seasons
    })
  }
  if (genres) {
    tvShows = tvShows.filter(item => item.listed_in.toLowerCase().includes(genres.toLowerCase()))
  }
  if (tvShows.length) {
    res.status(200).json({
      success: true,
      message: 'OK',
      body: {
        netflixTvShows: tvShows
      }
    })
  } else {
    res.status(404).json({
      success: false,
      message: 'Not found',
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
