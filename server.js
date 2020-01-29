import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import boardgamesData from "./data/boardgames.json"

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

//All boardgames
app.get("/boardgames", (req, res) => {
  res.json(boardgamesData)
})

//Specific boardgames, requires id
app.get("/boardgames/:id", (req, res) => {
  const id = req.params.id
  console.log(id)
  const boardgame = boardgamesData.find((game) => game.id === +id)
  res.json(boardgame)
})

//Boardgame from year, requires year
app.get("/year/:year", (req, res) => {
  const year = req.params.year
  const boardgamesFromYear = boardgamesData.filter((game) => game.year === +year)
  res.json(boardgamesFromYear)
})

//All boardgames sorted by rating
app.get("/rating", (req, res) => {
  const rating = boardgamesData.sort((game) => game.average)
  res.json(rating)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
