import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import netflixData from './data/netflix-titles.json'


console.log(netflixData)




// Defines the port the app will run on. 
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())



app.get('/', (req, res) => {
  res.send('Hello world')
})

//this get the whole api
app.get('/api', (req, res) => {
  res.json(netflixData)
})

//filters with query and endpoint search
app.get('/shows', (req, res) => {
  const searchString = req.query.search;
  // console.log(searchString)

  let filteredShows = netflixData;
  // console.log(filteredShows)


  if (searchString) {
    // if the (searchString) exist:

    //filters the data for a title, country, description & director
    filteredShows = filteredShows.filter(item => {
      const itemTitle = item.title.toString();
      const itemCountry = item.country.toString();
      const itemDescrpition = item.description.toString();
      const itemDirector = item.director.toString();

      return itemTitle.toLowerCase().includes(searchString) ||
        itemCountry.toLowerCase().includes(searchString) ||
        itemDescrpition.toLowerCase().includes(searchString) ||
        itemDirector.toLowerCase().includes(searchString);

    })
    res.json(filteredShows)
  }
})

//filters with id
app.get('/shows/id/:id', (req, res) => {
  const id = req.params.id
  // console.log(id)
  const showId = netflixData.filter((item) => item.show_id === +id)
  res.json(showId)
})

//filters with release year
app.get('/shows/year/:year', (req, res) => {
  const year = req.params.year
  // console.log(year)

  let moviesFromYear = netflixData.filter((item) => item.release_year === +year)

  res.json(moviesFromYear)
})


// Starts the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
