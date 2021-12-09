import express from "express"
import cors from "cors"
import artworksData from "./data/best-art.json"
import listEndpoints from "express-list-endpoints"

// Best Artworks of All Time
// Collection of Paintings of the 50 Most Influential Artists of All Time

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
  res.send("Hello from DarkSide :)) ")
})

// get a list of artists by querying their names, genre and nationality  (from json file)
app.get("/artworks", (req, res) => {
  const { name, genre, nationality } = req.query

  let artworksDataToSend = artworksData

  if (name) {
    // artworks/?name=van
    artworksDataToSend = artworksDataToSend.filter(
      (item) => item.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    )
  }

  if (genre) {
    // artworks/?genre=realism
    artworksDataToSend = artworksData.filter(
      (item) => item.genre.toLowerCase().indexOf(genre.toLowerCase()) !== -1
    )
  }

  if (nationality) {
    // artworks/?nationality=dut
    artworksDataToSend = artworksData.filter(
      (item) =>
        item.nationality.toLowerCase().indexOf(nationality.toLowerCase()) !== -1
    )
  }

  res.json({
    response: artworksDataToSend,
    success: true,
  })
})

app.get("/endpoints", (req, res) => {
  res.send(listEndpoints(app))
})

// Endpoint to get artworks by id number - with path params approach
app.get("/artworks/id/:id", (req, res) => {
  const { id } = req.params
  let showId = artworksData.find((item) => item.id === +id)

  if (!showId) {
    res.status(404).send(`sorry, no art found with id number ${id}`)
  } else {
    res.json(showId)
  }
})

// get a specific artworks by the artist name, using path params approach
app.get("/artworks/name/:name", (req, res) => {
  const { name } = req.params

  const artistByName = artworksData.find((item) => item.name === name)

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
