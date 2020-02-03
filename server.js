import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import netflixData from './data/netflix-titles.json'


// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
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

//BELOW SHOWS ALL TITLES
app.get('/all', (req, res) => { //req = request-object, res = result-object, 
  //Here we use the response object to stat building up the response to send back to the browser/the one requesting the data by GET
  // const title = req.query.title
  // let specificShowTitle = netflixData.filter((item) => item.title === title)

  // if (title) {
  //   specificShowTitle = specificShowTitle.filter((item) => item.title)  }



  res.json(netflixData)


})

//BELOW FILTERS TO SHOW ONLY THE TV-SHOWS
app.get('/shows/', (req, res) => { //req = request-object, res = result-object, 
  //Here we use the response object to stat building up the response to send back to the browser/the one requesting the data by GET

  const shows = netflixData.filter((item) => item.type === "TV Show")

  //Jag vill kunna söka på specifik titel

  res.json(shows)
})

app.get('/shows/:id', (req, res) => {
  const id = req.params.id
  const showsId = netflixData.filter((shows) => shows.type === "TV Show" && shows.show_id === +id)


  res.json(showsId)
})

app.get('/year/:year', (req, res) => {
  console.log({ year })
  const year = req.params.year
  const anyTypeFromYear = netflixData.filter((item) => item.release_year === +year) //(=== year, alltså det year som jag sätter in som endpoint i webbläsaren)



  res.json(anyTypeFromYear)
})






//BELOW FILTERS TO SHOW ONLY THE MOVIES
app.get('/movies', (req, res) => { //req = request-object, res = result-object, 
  //Here we use the response object to stat building up the response to send back to the browser/the one requesting the data by GET
  // res.json(netflixData)
  const movies = netflixData.filter(movies => (movies.type === "Movie"))

  res.json(movies)
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
