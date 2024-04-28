import express from 'express'
import cors from 'cors'
import expressListEndpoints from 'express-list-endpoints'
import airbnbData from './data/airbnb.json'

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
// Start defining your routes here
app.get('/', (req, res) => {
  const endpoints = expressListEndpoints(app)
  res.json(endpoints)
})
app.get('/accomodations', (req, res) => {
  res.json(airbnbData)
})
app.get('/accomodations/:accomodation', (req, res) => {
  const accomodation = req.params.accomodation
  const singleaccomodation = airbnbData.filter((item) => {
    if (item.id === +accomodation) {
      res.json(singleaccomodation)
    } else {
      res.status(404).json({ error: 'Accommodation not found' })
    }
  })
})
app.get('/neighbourhood/:neighbourhood', (req, res) => {
  const neighbourhood = req.params.neighbourhood
  const filteredNeighbourhood = airbnbData.filter((item) => {
    if (item.neighbourhood === neighbourhood) {
      res.json(filteredNeighbourhood)
    } else {
      res.status(404).json({ error: 'Accommodation not found' })
    }
  })
})
app.post('/accomodations', (req, res) => {
  const newAccomodation = req.body
  newId = airbnbData.length > 0 ? airbnbData[airbnbData.length - 1].id + 1 : 1
  newAccomodation.id = newId

  airbnbData.push(newAccomodation)
  res.status(201).json({
    message: 'Accommodation created successfully',
    data: newAccomodation,
  })
})
app.put('/accomodations/:accomodation', (req, res) => {
  const accomodationId = req.params.id
  const updatedData = req.body
  const index = airbnbData.findIndex(
    (accomodation) => accomodation.id === +accomodationId
  )
  if (index != -1) {
    airbnbData[index] = { ...airbnbData[index], ...updatedData }

    res.json({
      message: 'Accommodation updated successfully',
      data: airbnbData[index],
    })
  } else {
    res.status(404).json({ error: 'Accommodation not found' })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
