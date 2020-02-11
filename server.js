import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import athletesData from './data/athletes-data.json'

console.log(athletesData.length)

const port = process.env.PORT || 8080
const app = express()
// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

//Down below routes are defined
app.get('/', (req, res) => {
  res.send('Hello world, hej hej')
})
//Down below routes are defined
// //http://localhost:8080/athletes
// app.get('/athletes', (req, res) => {
//   res.json(athletesData)
// })

app.get('/athletes/:id', (req, res) => {
  const showId = req.params.id 
  console.log(showId)
  const show = athletesData.find(item => +item.competitorid === +showId)
  console.log("id path parameter")
  res.json(show)
})

app.get('/athletes', (req, res) => {
  // Query parameter
  const searchString = req.query.search

  let filteredAthletes = athletesData

  // console.log(searchString)

  if (searchString) {
    // Filter once
    // http://localhost:8080/athletes?search=Ulwahn
    filteredAthletes = filteredAthletes.filter(item => {
      const athleteName = item.lastname.toString()
      const athleteCountry = item.countryoforiginname.toString()
      const athleteAffiliate = item.affiliatename.toString()
      return athleteName.includes(searchString) ||
        athleteCountry.includes(searchString) ||
        athleteAffiliate.includes(searchString)
    })
  }

  res.json(filteredAthletes)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})