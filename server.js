import express, { request, response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import goldenGlobesData from './data/golden-globes.json'

//Ideas: filtering on different decades like

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

//The whole data set
app.get('/nominations', (request, response) => {
  response.json(goldenGlobesData)
})


//Filter on a films award year & win true or false
app.get('/awardyear/:awardYear', (request, response) => {
  const awardYear = request.params.awardYear
  //use query like ?won=true
  const showWon = request.query.won
  const showCategoryContains = request.query.categoryContains
  //use let to be able to filter it again
  let nominationsFromYear = goldenGlobesData.filter((item) => item.year_award === +awardYear)

  if (nominationsFromYear.length === 0) {
    response.send(`There are no nominations from year ${awardYear} in the data file!`)
  }

  if (showWon) {
    nominationsFromYear = nominationsFromYear.filter((item => item.win))
  }

  //check if the category contains a specific word
  // if (showCategoryContains != "") {
  //   nominationsFromYear = nominationsFromYear.filter((item => item.category.includes(categoryContains)))
  // }

  response.json(nominationsFromYear)
})

//Filter on film year with intervals
app.get('/year/new_films', (request, response) => {

  let newFilms = goldenGlobesData.filter((item => item.year_film > 2018))
  response.json(newFilms)
})

app.get('/year/old_films', (request, response) => {
  let oldFilms = goldenGlobesData.filter((item => item.year_film < 2011))
  response.json(oldFilms)
})

//Filter on film title
app.get('/films/:film', (request, response) => {
  const film = request.params.film
  let singleFilmNominations = goldenGlobesData.filter((item => item.film === film))

  if (singleFilmNominations.length === 0) {
    response.send(`The film title "${film}" does not exist in the data file!`)
  }
  response.json(singleFilmNominations)
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
