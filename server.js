import express from 'express'
import cors from 'cors'

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

app.get('/titles', (req, res) => {
  res.json(netflixData)
})

app.get('/titles/:show_id', (req, res) => {
  const { show_id } = req.params

  const titleId = netflixData.find(title => title.show_id === +show_id)

  if (!titleId) {
    console.log('Error: No title found')
    res.status(404).send('No title found.')
  } else {
    res.json(titleId)
    console.log('test')
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
