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
  res.send('Hello world')
})

//All boardgames
// app.get("/boardgames", (req, res) => {
//   res.json(boardgamesData)
// })

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

//Boardgame from year, requires year
app.get("/year/:year", (req, res) => {
  const year = req.params.year
  const boardgamesFromYear = boardgamesData.filter((game) => game.year === +year)
  res.json(boardgamesFromYear)
})

//All boardgames sorted by rating: average rating or rank
app.get('/rating/:rating', (req, res) => {
  const rating = req.params.rating
  if (rating === "average") {
    const gamesByRating = boardgamesData.sort((a, b) => -(parseFloat(a.average) - parseFloat(b.average)))
    res.json(gamesByRating)
  }
  else if (rating === "rank") {
    const gamesByRating = boardgamesData.sort((a, b) => -(parseFloat(b.rank) - parseFloat(a.rank)))
    res.json(gamesByRating)
  }
})

//Boardgames including a specific word in the name
// app.get("/boardgames", (req, res) => {
//   const query = req.query.q
//   if (query) {
//     const filterGames = (array, query) => {
//       return array.filter(game => game.toLowerCase().indexOf(query.toLowerCase()) !== -1)
//     }
//     filterGames(boardgamesData, query)
//     // boardgamesData.filter((game) => game.name)
//   }
// })

// app.get("/boardgames", (req, res) => {
//   const query = req.query.q

//   if (query) {
//     const filteredSearch = boardgamesData.filter((game) => game.name.toLowerCase().includes(query))
//     res.json(filteredSearch)
//   }

// })

//Path of variable when you're searching for something specific
//Query, when searching for something ambiguos, more options, like search strings

app.get("/boardgames", (req, res) => {
  const query = req.query.q
  if (query) {
    const filteredSearch = boardgamesData.filter(game => {
      const gameName = game.name.toString()
      return gameName.toLowerCase().includes(query.toLowerCase())
    })
    console.log(filteredSearch)
    if (filteredSearch.length === 0) {
      res.status(404).send(`Couldn't find any boardgame with "${query}" in the name`)
    } else {
      res.json(filteredSearch)
    }
  } else {
    res.json(boardgamesData)
  }

})



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
