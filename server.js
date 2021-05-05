import express, { query } from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

// import booksData from './data/books.json'
import netflixData from './data/netflix-titles.json'

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())

// SAVE THIS AND SEND SOMETHING LATER THAT WILL SHOW IN THE BROWSER
app.get('/', (req, res) => {
  //res.send('Hello and welcome to this API - documentation to come here as well as on GitHub // or just program a frontend please ?! What I have time for. Here can be a link')
  res.send(listEndpoints(app))
}) 

// it's logging in the Console but no output in Postman nor in browser on port ! 
// Is the problem an if statement that will not be true, always false ? but in that case it should return netflixData always. ÄR det ngt ovan om blockerar den?
app.get('/shows', (req, res) => {
  const { director }  = req.query
  
  
  if (director) {
    const queriedDirector = netflixData.filter(show => show.director.toLowerCase().includes(director.toLowerCase()))
    if (queriedDirector.length === 0 ) { 
      res.status(404).json({ error: 'Director not found' })
    } else {
      res.status(200).json({ data: queriedDirector })
    }
  } else {
    res.status(400).json({ error: 'Please write the name of a director' }) // 400 
  }
})

// endpoint to get all tv-shows + query on director name + TODO: add status code in first res. if name of director is not found
// TODO: do something so that you don't have to spell everything super correct even if user types in lower case eg. 
app.get('/shows/:id', (req, res) => {
  const { id }  = req.params
  const movieId = netflixData.find(movie => movie.show_id === +id)

  if (movieId) {
    res.status(200).json({ data: movieId });
  } else {
    res.status(404).json({ error: 'This movie can not be found' });
  }
})

// Rename things ? - NOW it is a bit messy with this kind of param & query http://localhost:3001/countries/South Korea?southKorea=South Korea
// South Korean shows and films (remove films and filter only on tv-shows to continue this logic) **** this is thought for frontEnd logic appearance
app.get('/countries/:countries', (req, res) => {
  const countries = req.params.country // SHOLD PROBABLY REMOVE THE :countries here? What is best practice? 

  const showSouthKorea = req.query.southKorea

  let tvShowsFromSouthKorea = netflixData.filter((show) => show.country === "South Korea") // can I add toLowerCase here as well? 
  
  if (showSouthKorea) {
    res.json({ data: tvShowsFromSouthKorea })
  } else {
    res.json({ data: countries }) // ? this is a questionmark
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
