import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'
import data from './data.json'



const port = process.env.PORT || 8080
//set up server
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
//to read json
app.use(bodyParser.json())

//Start defining routes here
app.get('/', (req, res) => {
  res.send(listEndpoints(app));
})

//Endpoints getting all data
app.get('/nominations', (req, res) => {
  res.json(data)
})

//Endpoint getting a year and film that won
app.get('/years/:year', (req, res) => {
  const year = req.params.year 
  const showWon = req.query.won
  let nominationsFromYear = data.filter((item) => item.year_award === +year)

  if (showWon) {
    nominationsFromYear = nominationsFromYear.filter((item) => item.win)
  }
  res.json(nominationsFromYear)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
