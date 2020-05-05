import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import goldenGlobesData from './data/golden-globes.json'

console.log(goldenGlobesData.length)
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})
app.get('/nominations', (req, res) => {
  res.json(goldenGlobesData)
})
app.get('/year/:year', (req, res) => {
  const year = req.params.year
  const showWon = req.query.won
  console.log({ year })
  let nominationsFromYear = goldenGlobesData.filter((item) => item.year_award === +year)
  if (showWon) {
    nominationsFromYear = nominationsFromYear.filter((item) => item.win)
  }
  res.json(nominationsFromYear)
})

app.get('/nominations:index', (req, res) => {
  const { index } = req.params
  console.log(index)
  res.send(goldenGlobesData[index])
})
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
