import express, { request, response } from 'express'
import listEndpoints from 'express-list-endpoints'
import cors from 'cors'

import data from './data/golden-globes.json'

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())

let goldenGlobesData = data

app.get('/', (request, response) => {
  response.send({ 
    Queries: { showWon: 'Boolean value', awardYear: 'Number', category: 'If the category contains a specific string value' }, 
    Endpoints: listEndpoints(app) })
})

app.get('/nominations', (request, response) => {  
  const { category, awardYear, showWon} = request.query
  let goldenGlobesData = data

  if (showWon) { 
    goldenGlobesData = goldenGlobesData.filter((item => item.win))
  }

  if (awardYear) { 
    goldenGlobesData = goldenGlobesData.filter((item) => item.year_award === +awardYear)
  }

  if (category) { 
    goldenGlobesData = goldenGlobesData.filter(item => item.category.toLowerCase().includes(category.toLowerCase()))
  }

  response.json({ lenght: goldenGlobesData.length, data: goldenGlobesData})
})

//Filter on film title, could give a single item or an array if one film title has several nominations
app.get('/nominations/:title', (request, response) => {
  const { title } = request.params
  let singleFilmNominations = goldenGlobesData.filter((item => item.film.toString().toLowerCase().includes(title.toLowerCase())))

  if (singleFilmNominations.length === 0) {
    response.status(404).json({ error: 'Not found'})
  }
  response.json({lenght: singleFilmNominations.length, data: singleFilmNominations})
})

app.get('/nominations/index/:index', (request, response) => {
  const { index } = request.params
  let indexTitle = goldenGlobesData[index]
  response.json({data: indexTitle})
})

app.get('/year/new_films', (request, response) => {
  let newFilms = goldenGlobesData.filter((item => item.year_film > 2018))
  response.json({ lenght: newFilms.length, data: newFilms})
})

app.get('/year/old_films', (request, response) => {
  let oldFilms = goldenGlobesData.filter((item => item.year_film < 2011))
  response.json({ lenght: oldFilms.length, data: oldFilms})
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
