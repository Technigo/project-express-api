import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import places from "./data/dream-places.json"

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

const shufflePlaces = () => {
  return places.sort(() => Math.random() - 1)
}

// Start defining your routes here
app.get('/', (req, res) => {
  res.status(200).json({ data: places })
  // res.send(listEndPoints(app))
})

app.get('/random', (req, res) => {
  const { amount } = req.query
  if (amount) {
    if (+amount <= 0) {
      res.status(400).json({ error: `Amount requested was less than 1.` })
    } else if (amount >= places.length) {
      res.status(413).json({ error: `Amount requested exceeds available data! :O Returning all available data.`, data: shufflePlaces() })
    } else {
      res.status(200).json({ data: shufflePlaces().splice(0, amount) })
    } 
  } else {
    res.status(200).json({ data: shufflePlaces().splice(0, 7) })
  }
})

app.get('/location/:id', (req, res) => {
  const { id } = req.params
  const foundId = places.find(place => place.id === id)
  if (!foundId) {
    res.status(404).json({ error: `no place was found with the ID ${id} :(` })
  } else {
    res.status(200).json({ data: foundId })
  }
})

app.get('/lucid/:fullName', (req, res) => {
  const { fullName } = req.params
  const fullNameFixed = fullName.replace(/_|-|\./, " ")
  const sortByName = places.filter(place => 
    place.governor.toLowerCase() === fullNameFixed.toLowerCase()
  )
  if (sortByName.length < 1) {
    res.status(404).json({ error: "Lucid not found :("})
  } else {
    res.json({ data: sortByName })
  }
})

//I should actually not use a path param ("slug") here. Instead, I should use a query param!!
app.get('/status', (req, res) => {
  const { status } = req.query
  switch(status) {
    case "prevalent":
    case "active":
    case "bustling":
    case "prevelent":
    case "hype":
      res.send(places.filter(place => place.status === "prevalent"))
    case "stable":
    case "normal":
    case "okay":
    case "healthy":
      res.send(places.filter(place => place.status === "stable"))
    case "fading":
    case "dying":
    case "unstable":
    case "faded":
      res.send(places.filter(place => place.status === "dispersed"))
    case "dispersed":
    case "despersed":
    case "dead":
    case "gone":
      res.send(places.filter(place => place.status === "dispersed"))
    default:
      res.status(404).json({ error: "Please enter status queries 'prevalent', 'stable', 'fading' or 'dispersed'. Example: '/status?status=fading"})
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})


// case "prevalent" || "bustling":
//       res.send(places.filter(place => place.status === "prevalent"))
//     case "stable" || "normal" || "active":
//       res.send(places.filter(place => place.status === "stable"))
//     case "fading" || "faded" || "unstable":
//       res.send(places.filter(place => place.status === "dispersed"))
//     case "dispersed" || "disperse" || "dead" || "gone":
//       res.send(places.filter(place => place.status === "dispersed"))