import express from "express"
import cors from "cors"

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
import netflixShows from "./data/netflix-titles.json"
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Lovisa Brorson!")
})

app.get("/netflixshows", (req, res) => {
  const { title, type } = req.query
  let allShows = netflixShows

  if (title) {
    allShows = allShows.filter(
      (item) => item.title.toLocaleLowerCase() === title.toLocaleLowerCase()
    )
  }
  if (type) {
    allShows = allShows.filter(
      (item) => item.type.toLocaleLowerCase() === type.toLocaleLowerCase
    )
  }

  res.status(200).json(netflixShows)
})

app.get("/netflixshows/title/:title", (req, res) => {
  const netflixtitle = netflixShows.find(
    (item) => item.title === req.params.title
  )

  if (!netflixtitle) {
    res.status(404).json("Can't find a Netfix show with this name")
  } else {
    res.status(200).json(netflixtitle)
  }
})

app.get("/netflixShows/type/:type", (req, res) => {
  const { type } = req.params
  const showType = netflixShows.filter(
    (item) => item.type.toLocaleLowerCase() === type.toLocaleLowerCase()
  )
  res.status(200).json(showType)
})

// Start the server
app.listen(port, () => {
  console.log(`Hello hello world on http://localhost:${port}`)
})
