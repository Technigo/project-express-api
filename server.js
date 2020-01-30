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
  res.send('Possible routes: /boardgames, /year/:year, /rating/:rating (change :rating to "average" or "rank" ')
})

//Specific boardgames, requires id
app.get("/boardgames/:id", (req, res) => {
  const id = req.params.id
  // const headers = req.headers
  // console.log("headers : " + JSON.stringify(headers, null, 2))
  const boardgame = boardgamesData.find((game) => game.id === +id)
  if (boardgame) {
    res.json(boardgame)
  } else {
    res.status(404).send(`No game found with id: ${id}`)
  }
})

//Pages or search
app.get("/boardgames", (req, res) => {
  //Query for name
  const nameSearch = req.query.name
  //Query for page Makes the number written in url to integer
  let pageSearch = parseInt(req.query.page)

  //Checks how many pages there is when every page has 10 objects
  const pageCount = Math.ceil(boardgamesData.length / 10)

  //If there's no query in the url, the page should be 1
  if (!pageSearch) {
    pageSearch = 1
  }
  //If the query is bigger than the pageCount it should show the last page
  //Meaning: if it's 100 pages and someone writes 101, it should show p100
  else if (pageSearch > pageCount) {
    pageSearch = pageCount
  }
  //If a nameSearch, filter and return only the ones that includes the query
  if (nameSearch) {
    const filteredSearch = boardgamesData.filter(game => {
      const gameName = game.name.toString()
      return gameName.toLowerCase().includes(nameSearch.toLowerCase())
    })
    //Checks how many pages the filtered search have
    const pageCount = Math.ceil(filteredSearch.length / 10)
    // console.log(filteredSearch)

    // If there's no query in the url, the page should be 1
    if (!pageSearch) {
      pageSearch = 1
    }
    //If the query is bigger than the pageCount it should show the last page
    //Meaning: if it's 100 pages and someone writes 101, it should show p100
    else if (pageSearch > pageCount) {
      pageSearch = pageCount
    }

    if (filteredSearch.length === 0) {
      res.status(404).send(`Couldn't find any boardgame with "${nameSearch}" in the name`)
    } else {
      res.json(filteredSearch.slice(pageSearch * 10 - 10, pageSearch * 10))
    }
  }

  //It slices the json, beginning on the page written in query
  //If page = 1, it should show 0-10
  //Eg. 5*10 -10, 5*10
  //If it's the 5th page it should show result 40 - 50
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

  //Check how many pages
  const pageCount = Math.ceil(boardgamesFromYear.length / 10)

  //If there's no query in the url, the page should be 1
  if (!pageSearch) {
    pageSearch = 1
  }
  //If the query is bigger than the pageCount it should show the last page
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


//Path of variable when you're searching for something specific
//Query, when searching for something ambiguos, more options, like search strings


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
