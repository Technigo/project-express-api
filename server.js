import express from "express"
import cors from "cors"
import artData from "./data/best-art.json"
import listEndpoints from "express-list-endpoints"

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// const users = [
// 	{ id: 1, name: 'Alice', age: 33 },
// 	{ id: 2, name: 'Bob', age: 23 },
// 	{ id: 3, name: 'Chris', age: 3 },
// 	{ id: 4, name: 'Daniela', age: 67 },
// ];

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello from DarkSide :)) ")
})

app.get("/arts", (req, res) => {
  res.json(artData)
})

// get a list of the artists with searching names and genre (from json file)
app.get("/arts", (req, res) => {
  const { name, genre } = req.query

  let artDataToSend = artData

  if (name) {
    artDataToSend = artDataToSend.filter(
      (item) => item.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    )
  }

  if (genre) {
    artDataToSend = artData.filter(
      (item) => item.genre.toLowerCase().indexOf(genre.toLowerCase()) !== -1
    )
  }

  res.json({
    response: artDataToSend,
    success: true,
  })
})

app.get("/endpoints", (req, res) => {
  res.send(listEndpoints(app))
})

// Endpoint to get arts by id number - with path params approach
app.get("/arts/id/:id", (req, res) => {
  const { id } = req.params
  let showId = artData.find((item) => item.id === +id)

  if (!showId) {
    res.status(404).send(`sorry, no art found with id number ${id}`)
  } else {
    res.json(showId)
  }
})

// get a specific artist by name, using path params approach
app.get("/arts/name/:name", (req, res) => {
  const { name } = req.params

  const artistByName = artData.find((item) => item.name === name)

  if (!artistByName) {
    res.status(404).json({
      response: "No artist found with that name",
      success: false,
    })
  } else {
    res.status(200).json({
      response: artistByName,
      success: true,
    })
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
