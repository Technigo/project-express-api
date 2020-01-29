import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import data from './data/netflix-titles.json'


console.log(data)
// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 

// import netflixData from './data/netflix-titles.json'


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
  res.send('Hello world')
})

// here the first one maybe should be used with the show_id to get a unique endpoint
//maybe
app.get('/api', (req, res) => {
  res.json(data)
})

app.get('/api/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  const showId = data.filter((item) => item.show_id === +id)
  res.json(showId)
})

// create a new thing at a specific department
// app.post('/netflix/:id/rate', (req, res) => {
//   const ratings = res.params.id
//   res.json(ratings)
// });

// update specific netflix movie/tv-show if exists
// app.put('/netflix/:id', (req, res) => {
//   const newNetflix = res.params.id
//   res.json(newNetflix)
// });


app.get('/api/year/:year', (req, res) => {
  const year = req.params.year
  console.log(year)
  // const showMovies = req.query.api
  let moviesFromYear = data.filter((item) => item.release_year === +year)
  //not woking
  // if (showMovies) {
  //   moviesFromYear = moviesFromYear.filter((item) => item.type)
  // }
  res.json(moviesFromYear)
})




// ****delete****

//from the express website:
// app.delete('/', function (req, res) {
//   res.send('DELETE request to homepage')
// })


// app.delete('/id/:id{id}', (req, res) => {
//   const deleteId = req.params.year
//   console.log(deleteId)
//   res.json(deleteId)
// })


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
