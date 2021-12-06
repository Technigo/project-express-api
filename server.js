import express from "express"
import cors from "cors"
import artData from "./data/best-art.json"

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello world")
})

app.get("/arts", (req, res) => {
  res.json(artData)
})

// Endpoint to search for name
app.get("/arts/search", (req, res) => {
  const { name } = req.query
  const filteredByName = artData.filter((art) =>
    art.names.toLowerCase().includes(name.toLowerCase())
  )

  if (filteredByName.length === 0) {
    res.status(404).json("Sorry, no art found by that name! ")
  }
  res.json(filteredByName)
})

// Endpoint to get arts by id number

app.get("/arts/:id", (req, res) => {
  const id = req.params.id
  let showId = artData.find((item) => item.id === +id)

  if (!showId) {
    res.status(404).send(`sorry, no art found with id number ${id}!`)
  }
  res.json(showId)
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
