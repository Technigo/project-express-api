import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
//import booksData from './data/books.json'
import listEndpoints from 'express-list-endpoints'
// import netflixData from './data/netflix-titles.json'
import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

app.get('/top-music', (req, res) => {
  res.json(topMusicData)
})

app.get('/top-music/:id', (req, res) => {
  const { id } = req.params
  const trackId = topMusicData.find(track => track.id === +id)

  if (trackId) {
    res.json({ data: trackId })   
  } else {
    res.status(404).json({ error: `Sorry, we didn't find id: ${id}` })
  }

  res.json(trackId)
})

app.get('/genre', (req, res) => {
  const trackGenres = []
  topMusicData.forEach(track => trackGenres.push(track.genre))

  let uniqueGenres = [...new Set(trackGenres)]

  res.json({ data: uniqueGenres })
})

app.get('/tracks', (req, res) => {
  const { artistName } = req.query
  const { trackName } = req.query

  console.log(trackName)
  
  let filteredTracks = topMusicData

  if (artistName) {
    filteredTracks = filteredTracks.filter(track => {
      const currentArtistName = track.artistName.toLowerCase()
      return currentArtistName.includes(artistName.toLowerCase())
    })
  }

  if (trackName) {
    filteredTracks = filteredTracks.filter(track => {
      const currentTrackName = track.trackName.toLowerCase()
      return currentTrackName.includes(trackName.toLowerCase())
    })
  }

  res.json({ data: filteredTracks })
})

app.get('/tracks/popular', (req, res) => {

})

app.get('/tracks/recommended', (req, res) => {
  res.json('Wanna listen to recommended tracks? Coming soon!')
})

app.get('/tracks/trending', (req, res) => {
  res.json("Wanna know the latest music trends? Hold on, we're working on it!" )
})

/*app.get('/books', (req, res) => {
  res.json(booksData)
})

app.get('/books/:isbn', (req, res) => {
  const { isbn } = req.params
  const findIsbn = booksData.find((book) => book.isbn === +isbn)

  if (findIsbn) {
    res.json({ data: findIsbn })   
  } else {
    res.status(404).json({ error: 'Not found' })
  }
   
})

app.get('/authors', (req, res) => {
  const authorsName = booksData.filter((book) => book.authors)
  res.json(authorsName)
})

app.get('/ratings', (req, res) => {
  const booksTopRated = booksData.filter((book) => book.average_rating >= 4.5)
  booksTopRated.sort(function (a, b) {
    return b.average_rating - a.average_rating
  })
  res.json(booksTopRated)
})

app.get('/pages', (req, res) => {
  const booksUnderHundredPages = booksData.filter((book) => book.num_pages <= 100)
  booksUnderHundredPages.sort(function (a, b) {
    return a.num_pages - b.num_pages
  })
  res.json(booksUnderHundredPages)
})*/


// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
