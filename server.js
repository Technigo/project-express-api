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

//All boardgames
// app.get("/boardgames", (req, res) => {
//   res.json(boardgamesData)
// })

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

// app.get("/boardgames", (req, res) => {
//   const query = req.query.q
//   if (query) {
//     const filteredSearch = boardgamesData.filter(game => {
//       const gameName = game.name.toString()
//       return gameName.toLowerCase().includes(query.toLowerCase())
//     })
//     // console.log(filteredSearch)
//     if (filteredSearch.length === 0) {
//       res.status(404).send(`Couldn't find any boardgame with "${query}" in the name`)
//     } else {
//       res.json(filteredSearch)
//     }
//   } else {
//     res.json(boardgamesData)
//   }
// })


//Pages or search
app.get("/boardgames", (req, res) => {
  //Query for name
  const nameSearch = req.query.name

  //Query for page Makes the number written in url to integer
  let page = parseInt(req.query.page)

  //Checks how many pages there is when every page has 20 objects
  const pageCount = Math.ceil(boardgamesData.length / 20)

  //If there's no query in the url, the page should be 1
  if (!page) {
    page = 1
  }
  //If the query is bigger than the pageCount it should show the last page
  //Meaning: if it's 100 pages and someone writes 101, it should show p100
  else if (page > pageCount) {
    page = pageCount
  }

  if (nameSearch) {
    const filteredSearch = boardgamesData.filter(game => {
      const gameName = game.name.toString()
      return gameName.toLowerCase().includes(nameSearch.toLowerCase())
    })
    //Checks how many pages the filtered search have
    const pageCount = Math.ceil(filteredSearch.length / 20)
    // console.log(filteredSearch)

    //If there's no query in the url, the page should be 1
    if (!page) {
      page = 1
    }
    //If the query is bigger than the pageCount it should show the last page
    //Meaning: if it's 100 pages and someone writes 101, it should show p100
    else if (page > pageCount) {
      page = pageCount
    }

    if (filteredSearch.length === 0) {
      res.status(404).send(`Couldn't find any boardgame with "${nameSearch}" in the name`)
    } else {
      res.json(filteredSearch.slice(page * 20 - 20, page * 20))
    }
  }

  //It slices the json, beginning on the page written in query
  //If page = 1, it should show 0-20
  //Eg. 5*20 -20, 5*20
  //If it's the 5th page it should show result 80 - 100

  res.json(boardgamesData.slice(page * 20 - 20, page * 20))


})

//Didn't work
// app.get("/boardgames/:id", (req, res) => {
//   const id = req.params.id
//   const year = req.query.year
//   console.log(id)
//   console.log(year)
//   if (id) {
//     const boardgame = boardgamesData.find((game) => game.id === +id)
//     if (boardgame) {
//       res.json(boardgame)
//     } else {
//       res.status(404).send(`No game found with id: ${id}`)
//     }
//   } else if (year) {
//     const boardgamesFromYear = boardgamesData.filter((game) => game.year === +year)
//     res.json(boardgamesFromYear)
//   }
// })

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


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
