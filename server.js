import express from 'express'
import cors from 'cors'
import netflixTitles from './data/netflix-titles.json'

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

//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
// This is your first endpoint
app.get('/', (req, res) => {
  res.send('Hello beautiful winter world')
})

// get a list of movies from netflix
app.get('/netflix', (req, res) => {
  res.json(netflixTitles)
})

// get a spepcific movie based on id, using param
app.get('/netflix/:id', (req, res) => {
  const { id } = req.params

  const showId = netflixTitles.find(show => show.show_id === +id)

    if (!showId) {
      res.status(404).send('no movie found with that ID')
    } else {
      res.json(showId)
    }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
