import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import netflixDatas from './data/netflix-titles.json'
console.log(netflixDatas)

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

//parseInt or number or + will converrt string to numbers

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
// Start defining your routes here
app.get('/', (req, res) => {
  res.json('Movie time!')
})

app.get('/netflix', (req, res) => {
  res.json(netflixDatas)
})
app.get('/name/:title', (req, res) => {
  const showTitle = netflixDatas.filter(
    (netflixData) => netflixData.type === req.params.type,
  )
  console.log(showTitle)
  res.status(200).json(showTitle)
})
app.get('/')

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
