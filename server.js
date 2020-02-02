import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'



// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
//import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
//import booksData from './data/books.json'
import netflixData from './data/netflix-titles.json'
import { query } from 'express/lib/express'
// import topMusicData from './data/top-music.json'

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
  res.send('Hello world')
})

app.get('/films', (req, res) => {
  res.json(netflixData)
})

app.get('/year/:year', (req, res) => {
 const year = req.params.year
 const filmsFromYear = netflixData.filter((item) => item.release_year === +year)
 res.json(filmsFromYear)
})

app.get('/film/:title', (req, res) => {
  const title = req.params.title
  const film = netflixData.filter((item) => item.title === title)
  res.json(film)
 })

app.get('/type/:type', (req, res) => {
  const type = req.params.type
  const typeOfFilm = netflixData.find((item) => item.type === type)
  res.json(typeOfFilm)
 })

 app.get('/films/:firstTenFilms', (req, res) => {
  const firstTenFilms = netflixData.slice(0, 10)
  res.json(firstTenFilms
    )
 })

 //http://localhost:8080/shows?search=choc  this is the searchstring for shows with the word 'choc' somewhere
 //const titleSearchString = req.query.search;
  // let filteredShows = netflixData.filter(item => {
     //const itemTitle = item.title.toString();
     //return itemTitle.toLowerCase().includes(titleSearchString.toLowerCase())
    
  // });
   //res.json(filteredShows);
 //});

 app.get('/shows', (req, res) => {
  const searchString = req.query.search;
    
  let filteredShows = netflixData
  
  if (searchString) {
    filteredShows = filteredShows.filter(item => {
      const itemTitle = item.title.toString();
      const itemCountry = item.country.toString();
      const itemDescription = item.description.toString();
      return itemTitle.toLowerCase().includes(searchString.toLowerCase()) || itemCountry.toLowerCase().includes(searchString.toLowerCase()) || itemDescription.toLowerCase().includes(searchString.toLowerCase())
    });
  }
  res.json(filteredShows);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)

})
