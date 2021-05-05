import express, { request } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import booksData from './data/golden-globes.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
// PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (request, response) => {
  response.send('Hello worlds')
})

app.get('/nominations', (request, response) => {
  response.json(booksData)
})

app.get('/year/:year', (request, response) => {
  const year = request.params.year
  const showWon = request.query.won
  console.log(showWon)
  //use let to be able to filter it again
  let nominationsFromYear = booksData.filter((item) => item.year_award === +year)

  if (showWon) {
    nominationsFromYear = nominationsFromYear.filter((item => item.win))
  }

  response.json(nominationsFromYear)
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
