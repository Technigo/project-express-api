import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

import netflixData from './data/netflix-titles.json'

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.json('Index page')
})

app.get ('/endpoints', (req, res) => {
  res.send(listEndpoints(app))
})

app.get('/catalogue', (req, res) => {
  res.json(netflixData)
})

app.get('/catalogue/id/:netflixId', (req, res) => {
  const { netflixId } = req.params

  const titleId = netflixData.find(item => item.show_id === +netflixId)

  if (!titleId) {
    res.status(404).send('No title by that id was found.')
  } else {
    res.json(titleId)
  }
})

app.get('/catalogue/name/:netflixTitle', (req, res) => {
  const { netflixTitle } = req.params
  
  const titleName = netflixData.find(item => item.title === netflixTitle)

  if (titleName) {
    res.status(200).json({
      response: titleName,
      success: true,
    })
  } else {
    res.status(404).json({
      response: 'No title by that name was found.',
      success: false,
    })
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
