import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import places from "./data/dream-places.json"

const fetch = require("node-fetch");

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

//Find port - netstat -ano | findstr :<PORT> (where PORT is your actual port value)
//Kill port - taskkill /PID <PID> /F (where PID is the last number listed in each row)

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

const shufflePlaces = () => {
  return places.sort(() => Math.random() - 1)
}

//functions
// const checkStatusSynonyms = (status) => {
//   switch(status) {
//     case "prevalent":
//     case "active":
//     case "bustling":
//     case "prevelent":
//     case "hype":
//       return "prevalent"
//     case "stable":
//     case "normal":
//     case "okay":
//     case "healthy":
//       return "stable"
//     case "fading":
//     case "dying":
//     case "unstable":
//     case "faded":
//       return "fading"
//     case "dispersed":
//     case "despersed":
//     case "dead":
//     case "gone":
//       return "dispersed"
//     default:
//       return "ERROR"
//   }
// }

// Start defining your routes here

//TO-DO:
//[_] offer the same filtering at the random route? Or is there not a usecase for that?

//QUESTIONS FOR MY FELLOW ZEBRAS:
//[_] is it superflous to have point route /status AND queries for it at the root?

//ASK ON SO:
//[_] is response code 413 appropriate for me?

//MAKE REACT APP:
//npx create-react-app my-app
//cd my-app
//npm start

app.get('/', (req, res) => {
  const { status, lucid, minSize, maxSize, keyword } = req.query
  let filteredPlaces = places
  let testy = []

  //Do i give async a second try or do I even need it?
  //Alternatively, maybe I can make keyword search its own route/endpoint? That way I bypass the problem.

  if (keyword) {
    fetch (`https://words.bighugelabs.com/api/2/5b150550ce000e98377ef0189eca303f/${keyword}/json`)
    .then(res => res.json())
    .then(similarWords => {
      filteredPlaces = filteredPlaces.filter(place => {
        let synonyms = []
        if (similarWords.hasOwnProperty("noun")) {
          synonyms = [...synonyms, ...similarWords.noun.syn]
        }
        if (similarWords.hasOwnProperty("adjective")) {
          synonyms = [...synonyms, ...similarWords.adjective.syn]
        }
        if (similarWords.hasOwnProperty("verb")) {
          synonyms = [...synonyms, ...similarWords.verb.syn]
        }
        testy = synonyms
        return ( 
          synonyms.some(word => place.keywords.includes(word))
        )
      })
      if (filteredPlaces.length === 0) {
        res.status(404).json({ error: `Couldn't find any locations related to keyword '${keyword}'.`})
      } else {
        res.status(200).json({ data: filteredPlaces })
      }
    })
    .catch(err => testy = err)
  }

  if (status) {
    filteredPlaces = filteredPlaces.filter(place => place.status === status)
  }
  if (lucid) {
    filteredPlaces = filteredPlaces.filter(place => place.governor === lucid.replace(/_|-|\./, " "))
  }
  if (minSize && maxSize) {
    filteredPlaces = filteredPlaces.filter(place => 
      parseInt(place.size.slice(0, place.size.length-1)) >= parseInt(minSize) 
      && parseInt(place.size.slice(0, place.size.length-1)) <= parseInt(maxSize)
    )
  } else if (minSize) {
    filteredPlaces = filteredPlaces.filter(place => 
      parseInt(place.size.slice(0, place.size.length-1)) >= parseInt(minSize) 
    )
  } else if (maxSize) {
    filteredPlaces = filteredPlaces.filter(place => 
      parseInt(place.size.slice(0, place.size.length-1)) <= parseInt(maxSize)
    )
  }
  
  if (keyword) {
    //do nothing
  } else {
    if (filteredPlaces.length === 0) {
      res.status(404).json({ error: `Couldn't find any locations related to keyword '${keyword}'.`})
    } else {
      res.status(200).json({ data: filteredPlaces })
    }
  }
  // res.send(listEndPoints(app))
})

app.get('/random', (req, res) => {
  const { amount } = req.query
  if (amount) {
    if (amount <= 0) {
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