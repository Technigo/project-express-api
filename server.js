import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import goldenGlobesData from './data/golden-globes.json'

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing

app.use(cors())
app.use(bodyParser.json())


// Start defining your routes here

app.get('/', (req, res) => {
  res.send('Hi! For all the data: http://localhost:8080/nominations, filter by category, http://localhost:8080/nominations?category=Best%20Original%20Score%20-%20Motion%20Picture, filter by year of the nomination: http://localhost:8080/nominations?year=2012, only the winner for a specific year: http://localhost:8080/nominations?year=2012&win=true, ')
})


// All the data
// http://localhost:8080/nominations

app.get('/nominations', (req, res) => {

  let result = goldenGlobesData
  const category = req.query.category

  if (category) {
    result = result.filter((item) => item.category === category)
  }

  const year = req.query.year

  if (year) {
    result = result.filter((item) => item.year_award === +year)
  }

  const showWinners = req.query.win

  if (showWinners) {
    result = result.filter((item) => item.win)
  }

  if (result.length === 0) {
    res.status(404).send('Not found, try again!')
  } else {
    res.json(result)
  }

  // not sure if this page-query works as it should


  const PER_PAGE = 20
  const page = req.query.page
  const startIndex = PER_PAGE * +page
  const data = result.slice(startIndex, startIndex + PER_PAGE)
  const pageCount = Math.ceil(result.length / 20)

  if (page >= pageCount) {
    res.status(404).send(`The page ${page} is not found, the last page is ${pageCount}.`);
  } else {
    res.json({
      totalPages: Math.floor(result.length / PER_PAGE),
      currentPage: +page,
      data
    })
  }

  res.json(result)
})






// Filter on category


// sort on title including f.ex. /Harry and then show all the harry potter titles etc

// app.get('/title', (req, res) => {
//   const title = req.query.title
//   const titleIncludes = goldenGlobesData.filter((item) => item.title.includes(title))

//   res.json(titleIncludes)
// })

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})






