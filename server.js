import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import fifaData from './data/fifa-worldcup.json'


console.log(fifaData.length)
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

// app.get('/matches', (req, res) => {
//   res.json(fifaData)
// })

// With "Query Parameter"
// localhost:8080/matches?stage=finals
// localhost:8080/matches?stage=group

app.get('/matches', (req, res) => {
  res.json(fifaData)

  const { stage } = req.query
  const getStage = fifaData.filter((item) =>
    item.Stage.toString().toLowerCase().includes(stage))

  if (getStage.length > 0) {
    res.json(getStage)
  }
  else {
    res.status(404).json({ message: 'No game' })
  }
})


app.get('/matches/:id', (req, res) => {
  const id = req.params.id
  const matchesId = fifaData.filter((item) => item.MatchID === +id)

  if (matchesId) {
    res.json(matchesId)
  }
  else {
    res.status(404).send({ message: 'No match' })
  }
})


app.get('/year/:year', (req, res) => {
  const { year } = req.params
  const matchesFromYear = fifaData.filter((item) => item.Year === +year)

  if (matchesFromYear) {
    res.json(matchesFromYear)
  }
  else {
    res.status(404).send({ message: 'No world cup this year' })
  }
})



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
