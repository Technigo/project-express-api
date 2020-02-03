import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

//deployed at: https://tereliusexpressdeployment.herokuapp.com/

import netflixData from './data/netflix-titles.json'
import { query } from 'express/lib/express'


// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

//get all films with the path "films"
app.get('/films', (req, res) => {
  res.json(netflixData)
})

//get film from specific year with for example the path "year/2019"
app.get('/year/:year', (req, res) => {
 const year = req.params.year
 const filmsFromYear = netflixData.filter((item) => item.release_year === +year)
 res.json(filmsFromYear)
})

//get specific film with for example the path "film/Chocolate"
app.get('/film/:title', (req, res) => {
  const title = req.params.title
  const film = netflixData.filter((item) => item.title === title)
  res.json(film)
 })

 //get the type of show with for example the path "type/Movie"
app.get('/type/:type', (req, res) => {
  const type = req.params.type
  const typeOfFilm = netflixData.find((item) => item.type === type)
  res.json(typeOfFilm)
 })

 //get the first 10 films with the path "films/firstTenFilms"
 app.get('/films/:firstTenFilms', (req, res) => {
  const firstTenFilms = netflixData.slice(0, 10)
  res.json(firstTenFilms)
 })

 //http://localhost:8080/show?search=choc  this is the searchstring for shows with the word 'choc' somewhere
 app.get('/show', (req, res) => { 
 const titleSearchString = req.query.search;
   let filteredShow = netflixData.filter(item => {
     const itemTitle = item.title.toString();
     return itemTitle.toLowerCase().includes(titleSearchString.toLowerCase())
    
   });
  
   res.json(filteredShow);
 });


 //get the films filtered on title, country and description with query and for example searchstring "/shows?search=sweden"
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
