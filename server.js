import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// import the api
import netflixData from './data/netflix-titles.json'


// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('View these endpoints /netflixtitles /year/:year')
})

app.get('/netflixtitles', (req, res) => {
  res.json(netflixData)
})

// `/songs` - Returns an array of songs

// `/songs/5` - Returns a single song whose ID is '5'



app.get('/year/:year', (req, res) => {

  const year = req.params.year 
  const showType = req.query.type
  let netflixReleaseYear = netflixData.filter((item) => +item.release_year === +year)

  if (year > 2020) {
    res.status(404).send('No netflix releses for this year but stay tuned');
  }
   
  if (showType) {
    netflixReleaseYear = netflixReleaseYear.filter((item) => item.type.toLowerCase() === showType.toLowerCase());
  } else if (showType != null) {
    res.status(404).send(`No ${showType} relesed year`);
  }

  
  res.json(netflixReleaseYear)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})