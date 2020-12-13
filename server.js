import express, { response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import data from './data/netflix-titles.json'

//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send(data)
})

app.get('/year', (req, res) => {
  res.json(data)
})
app.get('/years/:year', (req, res) => {
  const year = req.params.year
  const type = req.query.type

  const releaseYear = data.filter((item) => item.release_year === +year)

if (type) {
   releaseYear = releaseYear.filter((item) => item.type === type)
}
    res.json(releaseYear)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
