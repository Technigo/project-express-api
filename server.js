import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// import booksData from './data/books.json'
import ramenData from './data/ramen-ratings.json'

const port = process.env.PORT || 8000
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here

app.get('/', (request, response) => {
  response.send(ramenData)
})

app.get('/ramen', (request, response) => {
  const { brand } = request.query
  const { variety } = request.query
  const { packaging } = request.query
  if (brand) {
    const ramenBrandName = ramenData.filter((ramen) => ramen.brand_name.includes(brand))
    response.json(ramenBrandName)
  } if (variety) {
    const ramenVariety = ramenData.filter((ramen) => ramen.ramen_variety.includes(variety))
    response.json(ramenVariety)
  } if (packaging) {
    const ramenPackaging = ramenData.filter((ramen) => ramen.packaging.includes(packaging))
    response.json(ramenPackaging)
  }

  response.json(ramenData)
})

app.get('/ramen/:id', (request, response) => {
  const { id } = request.params
  const ramen = ramenData.find((ramen) => ramen.review_ID === +id)
  if (!ramen) {
    response.status(404).send(`Sorry no ramen review number ${id} was found.`)
  }
  response.json(ramen)
})


// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
