import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
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
  res.send('Hello world')
})

app.get('/movies', (req, res) => {
  res.json(netflixData)
})

app.get('/country/:country', (req, res) => {
  const country = req.params.country

  const movieFromCountry = netflixData.filter((item) => item.country === country)

  res.json(movieFromCountry)
  // if (country) {
  //   movieFromCountry = movieFromCountry
  // }
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
