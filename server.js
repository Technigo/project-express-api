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
  const { title, type, country } = req.query
  let allShows = netflixShows

  if (title) {
    allShows = allShows.filter(
      (item) => item.title.toLocaleLowerCase() === title.toLocaleLowerCase()
    )
  }
  if (type) {
    allShows = allShows.filter(
      (item) => item.type.toLocaleLowerCase() === type.toLocaleLowerCase()
    )
  }

  if (country) {
    allShows = allShows.filter(
      (item) => item.country.toLocaleLowerCase() === country.toLocaleLowerCase()
    )
  }

  res.status(200).json({
    data: allShows,
    success: true,
  })
})

//Row 57+58 is one way to wright, another way is row 76-78.

app.get("/netflixshows/title/:title", (req, res) => {
  const netflixtitle = netflixShows.find(
    (item) =>
      item.title.toLocaleLowerCase() === req.params.title.toLocaleLowerCase()
  )

  if (!netflixtitle) {
    res.status(404).json({
      data: "Can't find a Netfix show with this name",
      success: false,
    })
  } else {
    res.status(200).json({
      data: netflixtitle,
      success: true,
    })
  }
})

app.get("/netflixShows/type/:type", (req, res) => {
  const { type } = req.params
  const showType = netflixShows.filter(
    (item) => item.type.toLocaleLowerCase() === type.toLocaleLowerCase()
  )
  res.status(200).json({
    data: showType,
    success: true,
  })
})

app.get("/netflixShows/country/:country", (req, res) => {
  const { country } = req.params
  const showCountry = netflixShows.filter(
    (item) => item.country.toLocaleLowerCase() === country.toLocaleLowerCase()
  )
  res.status(200).json({
    data: showCountry,
    success: true,
  })
})

// Start the server
app.listen(port, () => {
  console.log(`Hello hello world on http://localhost:${port}`)
})
