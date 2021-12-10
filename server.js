import express from "express"
import cors from "cors"
import listEndpoints from "express-list-endpoints"
import netflixData from "./data/netflix-titles.json"
// import topMusicData from './data/top-music.json'

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
  res.send(
    "Hello This is the root-endpoint to my netflix API. By adding /endpoints to the url you can get an overview of the possible endpoints"
  )
})

app.get("/endpoints", (req, res) => {
  res.send(listEndpoints(app))
})

app.get("/netflix-titles", (req, res) => {
  const { title } = req.query

  let titles = netflixData

  if (title) {
    titles = titles.filter(
      (item) => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1
    )
  } else {
    res.status(200).json({
      response: netflixData,
      success: true,
    })
  }
})

app.get("/netflix-titles/tvshows", (req, res) => {
  const tvshows = netflixData.filter((item) => item.type === "TV Show")

  res.status(200).json({
    response: tvshows,
    success: true,
  })
})

app.get("/netflix-titles/movies", (req, res) => {
  const movies = netflixData.filter((item) => item.type === "Movie")

  res.status(200).json({
    response: movies,
    success: true,
  })
})

app.get("/netflix-titles/show_id/:show_id", (req, res) => {
  const { show_id } = req.params

  const showId = netflixData.find((show) => show.show_id === +show_id)

  if (!showId) {
    res.status(404).json({
      response: "Sorry, no show found with that id number",
      success: false,
    })
  } else {
    res.status(200).json({
      response: showId,
      success: true,
    })
  }
})

app.get("/netflix-titles/year/:year", (req, res) => {
  const year = req.params.year
  let releaseYear = netflixData.filter((item) => item.release_year === +year)

  if (!releaseYear) {
    res.status(404).json({
      response: "Sorry, no data found from that year",
      success: false,
    })
  } else {
    res.status(200).json({
      response: releaseYear,
      success: true,
    })
  }
})

app.get("/netflix-titles/title/:title", (req, res) => {
  const { title } = req.params

  const titleByName = netflixData.find((item) => item.title === title)

  if (!titleByName) {
    res.status(404).json({
      response: "Sorry, no title found with that name",
      success: false,
    })
  } else {
    res.status(200).json({
      response: titleByName,
      success: true,
    })
  }
})

// Starting the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
