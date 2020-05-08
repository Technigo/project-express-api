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
// Show all the nominations 
app.get('/nominations', (req, res) => {
  res.json(goldenGlobesData)
})
// show the nominations of a specific year with Path Parameter
// show only the nominations that won with query 
app.get('/nominations/years/:year', (req, res) => {
  const year = req.params.year
  const showWon = req.query.won
  console.log({ year })
  console.log({ showWon })
  let nominationsFromYear = goldenGlobesData.filter((item) => item.year_award === +year)
  if (showWon) {
    nominationsFromYear = nominationsFromYear.filter((item) => item.win.toString() == showWon)
  }
  res.json(nominationsFromYear)
})
//show the nominations within specific category 
//use query to filter the results with specific year 
app.get('/nominations/categories/:category', (req, res) => {
  const category = req.params.category
  const year = req.query.year
  console.log({ category })
  console.log({ year })
  let nominationsBestForeign = goldenGlobesData.filter((item) => item.category === 'Best Motion Picture - Foreign Language')
  if (year) {
    nominationsBestForeign = nominationsBestForeign.filter((item) => item.year_award === +year)
  }
  res.json(nominationsBestForeign)
})
//show only 20 objects per request
app.get('/startpage', (req, res) => {
  const page = req.query.page ?? 1
  const pageSize = req.query.pageSize ?? 20
  const startIndex = page * pageSize
  const endIndex = startIndex + +pageSize
  const nominationsForPage = goldenGlobesData.slice(startIndex, endIndex)
  const returnObject = {
    pageSize: pageSize,
    page: page,
    maxPages: parseInt(goldenGlobesData.length / pageSize),
    results: nominationsForPage
  }
  res.json(returnObject)
})
/* app.get('/nominations:index', (req, res) => {
  const { index } = req.params
  console.log(index)
  res.send(goldenGlobesData[index])
}) */
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
