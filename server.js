import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import data from './data.json'

console.log(data.length)

//   PORT=9000 npm start
const port = process.env.PORT || 8080
//set up server
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
//to read json
app.use(bodyParser.json())

// Start defining routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

//Endpoints getting all data
app.get('/nominations', (req, res) => {
  res.json(data)

})

//Endpoint getting year and film won
app.get('/year/:year', (req, res) => {
  const year = req.params.year 
  const showWon =req.query.won
  console.log(showWon)
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
