import express from "express"
//Express and bodyparser makes the same thing
import cors from "cors"

import netflixTitles from "./data/netflix-titles.json"

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

console.log(netflixTitles.length)
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
// app.get("/", (req, res) => {
//   res.send("Hello world")
// })

app.get("/", (req, res) => {
  res.json(netflixTitles)
})

app.get("/titles", (req, res) => {
  res.json(netflixTitles)
})

app.get("/year/:year", (req, res) => {
  const year = req.params.year
  const showType = req.query.type
  console.log("showType", showType)

  let titlesReleaseYear = netflixTitles.filter(
    item => item.release_year === +year
  )

  if (showType) {
    console.log("hello")
    titlesReleaseYear = titlesReleaseYear.filter(
      item => item.type.toLowerCase().indexOf(showType.toLowerCase()) !== -1
    )
  }
  // } else {
  //   titlesReleaseYear = titlesReleaseYear.filter(
  //     item => item.type === "TV Show"
  //   )
  // }

  res.json(titlesReleaseYear)
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
