import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import places from "./data/dream-places.json"

const fetch = require("node-fetch");

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(bodyParser.json())

const shufflePlaces = () => {
  return places.sort(() => Math.random() - 1)
}

app.get('/', (req, res) => {
  const { status, lucid, minSize, maxSize, keyword } = req.query
  let filteredPlaces = places
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
    .catch(err => console.log(err))
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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})