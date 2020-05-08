import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// Imported API
import netflixData from './data/netflix-titles.json'

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Routes 

//(Start page)
app.get('/', (req, res) => {
  res.send('<h1>View these endpoints</h1> All netflixtitles => https://ebbabw-express-deploy.herokuapp.com/netflixtitles <br> Netflixtitles single id  =>  https://ebbabw-express-deploy.herokuapp.com/netflixtitles/80025678 <br> Filter on year and filter on movie and tv shows relesed on diffrent years => https://ebbabw-express-deploy.herokuapp.com/year/2019 and https://ebbabw-express-deploy.herokuapp.com/year/2019/?type=movie or https://ebbabw-express-deploy.herokuapp.com/year/2019/?type=tv%20show')
})

//(All netflixtitles)
app.get('/netflixtitles', (req, res) => {
  res.json(netflixData)
})

//(netflixtitles single id)
app.get('/netflixtitles/:id', (req, res) => {
  const netflixId = req.params.id 
  const showID = netflixData.find((item) => item.show_id === +netflixId)
 
  if(showID) {
    res.json(showID)
  } else {
    res.status(404).send('ID not found');
  }
 
})

//(filter on year)
app.get('/year/:year', (req, res) => {

  const year = req.params.year 
  const showType = req.query.type
  let netflixReleaseYear = netflixData.filter((item) => +item.release_year === +year)

   if (year && netflixReleaseYear.length === 0) {
      res.status(404).send('No netflix releses for this year but stay tuned');
}

  //(filter on movie and tv shows relesed on diffrent years)
   if (showType) {
    netflixReleaseYear = netflixReleaseYear.filter((item) =>
      item.type.toLowerCase() === showType.toLowerCase());
}

   if (showType && netflixReleaseYear.length === 0) {
      res.status(404).send(`No ${showType}s relesed this year`);
}

  res.json(netflixReleaseYear)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})