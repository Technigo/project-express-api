import express from 'express'
import cors from 'cors'
import nobelPrizeWinners from'./data/nobel-prize.json'

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
// THIS IS IMPORTMENT FOR DEPLOY WITH HEROKU
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('phil-mebobbins')
})

// List all winners, and then as query, can return all female winners

app.get('/winners', (req, res) =>{
  const femaleWon = req.query.female
  let winners = nobelPrizeWinners

  if (femaleWon){
    winners = nobelPrizeWinners.filter((item) => item.gender ==='female')
  }
  res.json(winners)
  
})

// list all winners from a particular year
app.get('/year/:year', (req, res)=> {
const year= req.params.year // we can get the value of the year from the url and store as a variable
const winnersFromYear = nobelPrizeWinners.filter((item)=> item.year=== +year) // use the year to filter array, the 
res.json(winnersFromYear)
})

//fetches category winners from input into url
app.get ('/category/:category', (req, res) => {
  const category = req.params.category
  const categoryWinners = nobelPrizeWinners.filter((item)=>item.category === category)
  res.json(categoryWinners)
})

// fetches chemistry winners from any year
app.get('/chemistry/year/:year', (req, res)=> {
  const year= req.params.year
  const chemistryEachYear = nobelPrizeWinners.filter((item) => item.category ==='chemistry' && item.year=== +year) 
  res.json(chemistryEachYear)
})
// fetches any winner from any category and any year
app.get ('/category/:category/year/:year', (req, res) =>{
  const year= req.params.year
  const category = req.params.category

  const categoryYearWinners = nobelPrizeWinners.filter((item)=> item.category === category && item.year=== +year)
  res.json(categoryYearWinners)
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  //allows Herouk to select which port it will run on
  console.log(`Server running on http://localhost:${port}`)
})
