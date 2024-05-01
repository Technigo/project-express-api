import express from "express"
import expressListEndpoints from "express-list-endpoints"
import cors from "cors"
import horseData from "./data/horses.json"

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

//Show API documentation
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app)
  res.json(endpoints)
})

// Start defining your routes here - minimum 3 routes

//Get all horses for sale
app.get("/horses", (req, res) => {
  res.json(horseData)
})

//Get horses born a specific year
app.get("/year/:year", (req, res) => {
  const year = req.params.year
  const showWon = req.query.won
  let horsesFromYear = horseData.filter((item) => item.year_birth === +year)

  if (showWon) {
    horsesFromYear = horsesFromYear.filter((item) => item.competitions_won)
  }

  if (horsesFromYear.length === 0) {
    return res
      .status(404)
      .send(
        "No horses found with this criteria, try adding a different year at the end of the URL"
      )
  }

  res.json(horsesFromYear)
})

//Get horses of a specific gender
app.get("/gender/:gender", (req, res) => {
  const gender = req.params.gender
  const showWon = req.query.won
  let horsesOfGender = horseData.filter(
    (item) => item.gender.toLowerCase() === gender
  )

  if (showWon) {
    horsesOfGender = horsesOfGender.filter((item) => item.competitions_won)
  }

  if (horsesOfGender.length === 0) {
    return res
      .status(404)
      .send(
        "Try adding an existing gender at the end of the URL - stallion, gelding or mare"
      )
  }

  res.json(horsesOfGender)
})

//Get one horse based on ID
app.get("/horses/:horseId", (req, res) => {
  const { horseId } = req.params
  const horse = horseData.find((horse) => +horseId === horse.id)
  if (horse) {
    res.json(horse)
  } else {
    res
      .status(404)
      .send(
        "No horse found with this ID. There are only 50 horses for sale, try adding and ID between 1-50 at the end of the URL"
      )
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
