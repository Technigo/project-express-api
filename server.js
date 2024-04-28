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

app.get('/', (req, res) => {
  const endpoints = expressListEndpoints(app)
  res.json(endpoints)
})
app.get('/accommodations', (req, res) => {
  const { room_type, neighbourhood, page } = req.query
  const pageSize = 10 // Number of items per page
  let filteredAccommodation = [...airbnbData]

  if (room_type) {
    filteredAccommodation = filteredAccommodation.filter(
      (item) => item.room_type === room_type
    )
  }
  if (neighbourhood) {
    filteredAccommodation = filteredAccommodation.filter(
      (item) => item.neighbourhood === neighbourhood
    )
  }

  const currentPage = parseInt(page) || 1
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize

  const paginatedResults = filteredAccommodation.slice(startIndex, endIndex)
  // Clients can request different pages by providing the page query parameter in the URL, like this: http://localhost:8080/accommodations?page=2
  res.json({
    page: currentPage,
    total_pages: Math.ceil(filteredAccommodation.length / pageSize),
    data: paginatedResults,
  })
})
app.get('/accommodations/:accommodation', (req, res) => {
  const accommodation = req.params.accommodation
  const singleaccommodation = airbnbData.filter((item) => {
    if (item.id === +accommodation) {
      res.json(singleaccommodation)
    } else {
      res.status(404).json({ error: 'Accommodation not found' })
    }
  })
})
app.get('/neighbourhoods/:neighbourhood', (req, res) => {
  const neighbourhood = req.params.neighbourhood
  const showRoomType = req.query.room_type

  let filteredNeighbourhood = airbnbData.filter(
    (item) => item.neighbourhood === neighbourhood
  )

  if (showRoomType) {
    filteredNeighbourhood = filteredNeighbourhood.filter(
      (item) => item.room_type === showRoomType
    )
  }

  if (filteredNeighbourhood.length > 0) {
    res.json(filteredNeighbourhood)
  } else {
    res
      .status(404)
      .json({ error: 'Accommodations not found in this neighbourhood' })
  }
})
app.post('/accommodations', (req, res) => {
  const newAccommodation = req.body
  newId = airbnbData.length > 0 ? airbnbData[airbnbData.length - 1].id + 1 : 1
  newAccommodation.id = newId

  airbnbData.push(newAccommodation)
  res.status(201).json({
    message: 'Accommodation created successfully',
    data: newAccommodation,
  })
})
app.put('/accommodation/:accommodation', (req, res) => {
  const accommodationId = req.params.accommodation
  const updatedData = req.body
  const index = airbnbData.findIndex(
    (accommodation) => accommodation.id === +accommodationId
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
