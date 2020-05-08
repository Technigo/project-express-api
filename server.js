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
  res.send('Hi! For all the data: http://localhost:8080/nominations, filter by year of the nomination: http://localhost:8080/year/2010, only the winner for a specific year: http://localhost:8080/year/2013?win=true, filter by ceremony: http://localhost:8080/nominations/ceremony/67')
})


// not sure if this page-query works as it should

app.get('/page', (req, res) => {
  const PER_PAGE = 20
  const page = req.query.page
  const startIndex = PER_PAGE * +page
  const data = goldenGlobesData.slice(startIndex, startIndex + PER_PAGE)
  const pageCount = Math.ceil(goldenGlobesData.length / 20)

  if (page >= pageCount) {
    res.status(404).send(`The page ${page} is not found, the last page is ${pageCount}.`);
  } else {
    res.json({
      totalPages: Math.floor(goldenGlobesData.length / PER_PAGE),
      currentPage: +page,
      data
    })
  }
})

// All the data
// http://localhost:8080/nominations

app.get('/nominations', (req, res) => {
  res.json(goldenGlobesData)
})

// // FILTER ON ID or similar
// //http://localhost:8080/books/1
// app.get('/books/:id', (req, res) => {
//   const bookId = req.params.id
//   const book = booksData.find((item) => item.bookID === +bookId)

//   if (book) {
//     res.json(book);
//   } else {
//     res.status(404).send('Not found')
//   }
// })


// The winners per selected year 
// http://localhost:8080/year/2010

app.get('/year/:year', (req, res) => {
  const year = req.params.year
  const showWinners = req.query.win
  let nominationsFromYear = goldenGlobesData.filter((item) => item.year_award === +year)

  if (showWinners) {
    nominationsFromYear = nominationsFromYear.filter((item) => item.win)
  }

  res.json(nominationsFromYear)
})


// filer on ceremony
// http://localhost:8080/nominations/ceremony/67

app.get('/ceremony/', (req, res) => {
  const searchCeremony = req.query.ceremony
  let filteredNominations = ceremonyData

  if (searchCeremony) {
    filteredNominations = filteredNominations.filter(item => {
      const ceremony = item.authors.toString()
      return ceremony.includes(searchCeremony)
    })
  }

  if (filteredNominations.length === 0) {
    res.status(404).send('Ceremony not found, try again!')
  } else {
    res.json(filteredNominations)
  }
})


// http://localhost:8080/category/Best Television Series - Musical or Comedy

app.get('/category/:category', (req, res) => {
  const category = req.params.category
  const nominationCategory = goldenGlobesData.filter((item) => item.category === category)

  if (nominationCategory.length === 0) {
    res.status(404).send(`Not found. Your entry: ${category} is not valid.`)
  } else {
    res.json(nominationCategory)
  }
})

// sort on title including f.ex. /Harry and then show all the harry potter titles etc

// app.get('/title', (req, res) => {
//   const title = req.query.title
//   const titleIncludes = goldenGlobesData.filter((item) => item.title.includes(title))

//   res.json(titleIncludes)
// })

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})






