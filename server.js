import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'


// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
import booksData from './data/books.json'
console.log(booksData.length)
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
  // res.json(booksData)
})

app.get('/books', (req, res) => {
  res.json(booksData)
})

app.get('/language/:language', (req, res) => {
  const language = req.params.language
  // const showRating = req.query.average_rating
  let titleInLanguage = booksData.filter((item) => item.language_code === language)
  res.json(titleInLanguage)

  // if (showRating) {
  //       titleInLanguage = titleInLanguage.filter((item) => item.average_rating > 4)
  // }
})

app.get('/movies', (req, res) => {
  res.json(goldenGlobesData)
})

app.get('/year/:year', (req, res) => {
  const year = req.params.year
  const showWon = req.query.win
  console.log(showWon)
  let nominationFromYear = goldenGlobesData.filter((item) => item.year_award === +year)
  

  if (showWon) {
      nominationFromYear = nominationFromYear.filter((item) => item.win)
  }

  res.json(nominationFromYear)

})




// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
