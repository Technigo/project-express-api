import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import boardgamesData from "./data/boardgames.json"

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

//ROUTES

//Homepage
app.get('/', (req, res) => {
  res.send('Possible routes: /boardgames/:id, /year/:year, /rating/:rating (change :rating to "average" or "rank" ')
})

//Specific boardgames, requires id
app.get("/boardgames/:id", (req, res) => {
  const id = req.params.id
  const boardgame = boardgamesData.find((game) => game.id === +id)
  if (boardgame) {
    res.json(boardgame)
  } else {
    res.status(404).send(`No game found with id: ${id}`)
  }
})

//Pages or search for name
app.get("/boardgames", (req, res) => {
  //Query for name
  const nameSearch = req.query.name

  //Query for page
  //Makes the number written in url to integer
  let pageSearch = parseInt(req.query.page)

  //Checks how many pages there is if every page has 10 objects
  const pageCount = Math.ceil(boardgamesData.length / 10)

  //If there's no page-query in the url, show first page
  if (!pageSearch) {
    pageSearch = 1
  }
  //If the page-query is bigger than the pageCount it should show the last page
  else if (pageSearch > pageCount) {
    pageSearch = pageCount
  }

  //If a nameSearch, filter and return only the ones that includes the query
  if (nameSearch) {
    const filteredSearch = boardgamesData.filter(game => {
      const gameName = game.name.toString()
      return gameName.toLowerCase().includes(nameSearch.toLowerCase())
    })
    const pageCount = Math.ceil(filteredSearch.length / 10)
    if (!pageSearch) {
      pageSearch = 1
    }
    else if (pageSearch > pageCount) {
      pageSearch = pageCount
    }

    if (filteredSearch.length === 0) {
      res.status(404).send(`Couldn't find any boardgame with "${nameSearch}" in the name`)
    } else {
      res.json(filteredSearch.slice(pageSearch * 10 - 10, pageSearch * 10))
    }
  }

  //Slice the data, begin on the page written in query
  res.json(boardgamesData.slice(pageSearch * 10 - 10, pageSearch * 10))
})

//Boardgame from year, requires year
app.get("/year/:year", (req, res) => {
  //param for year
  const year = req.params.year

  //query for page
  let pageSearch = parseInt(req.query.page)

  //filter years
  const boardgamesFromYear = boardgamesData.filter((game) => game.year === +year)

  const pageCount = Math.ceil(boardgamesFromYear.length / 10)
  if (!pageSearch) {
    pageSearch = 1
  }
  else if (pageSearch > pageCount) {
    pageSearch = pageCount
  }
  if (boardgamesFromYear.length === 0) {
    res.status(404).send(`Couldn't find any boardgame from year ${year}`)
  } else {
    res.json(boardgamesFromYear.slice(pageSearch * 10 - 10, pageSearch * 10))
  }
})

//All boardgames sorted by rating: average rating or rank
app.get('/rating/:rating', (req, res) => {
  //param for rating, could be "average" or "rank"
  const ratingSearch = req.params.rating

  //query for pages
  let pageSearch = parseInt(req.query.page)

  if (ratingSearch === "average") {
    const gamesByAverage = boardgamesData.sort((a, b) => -(parseFloat(a.average) - parseFloat(b.average)))
    const pageCount = Math.ceil(gamesByAverage.length / 10)
    if (!pageSearch) {
      pageSearch = 1
    }
    else if (pageSearch > pageCount) {
      pageSearch = pageCount
    }
    res.json(gamesByAverage.slice(pageSearch * 10 - 10, pageSearch * 10))
  }
  else if (ratingSearch === "rank") {
    const gamesByRank = boardgamesData.sort((a, b) => -(parseFloat(b.rank) - parseFloat(a.rank)))
    const pageCount = Math.ceil(gamesByRank.length / 10)
    if (!pageSearch) {
      pageSearch = 1
    }
    else if (pageSearch > pageCount) {
      pageSearch = pageCount
    }
    res.json(gamesByRank.slice(pageSearch * 10 - 10, pageSearch * 10))
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
