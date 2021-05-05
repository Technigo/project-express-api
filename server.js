import express from 'express'
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
app.get('/shows', (req, res) => {
  const { director }  = req.query
  //console.log(director)
  if (director) { 
    const queriedDirector = netflixData.filter(show => {
      //console.log(show.director.toLowerCase()) //,  director.toLowerCase() ---> it is the director that is NOT defined at all comes out empty!
      show.director.toLowerCase().includes(director.toLowerCase()) // the problem is that these two do not match each other ?? 
    })
    //console.log(queriedDirector)
    res.json(queriedDirector)
  } else {
    res.json(netflixData) // Should here be a status code instead ?? Sorry that was not found! 
  }
})

// endpoint to get all tv-shows + query on director name + TODO: add status code in first res. if name of director is not found
// TODO: do something so that you don't have to spell everything super correct even if user types in lower case eg. 
app.get('/shows/:id', (req, res) => {
  const { id }  = req.params
  const movieId = netflixData.find(movie => movie.show_id === +id)
  //console.log(movieId)

  if (movieId) {
    res.status(200).json({ data: movieId });
  } else {
    res.status(404).json({ error: 'Not found' });
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
