import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import goldenGlobesData from './data/golden-globes.json'

console.log(goldenGlobesData.length)

const port = process.env.PORT || 8080;
const app = express()


app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Golden Globe nominations 2010-2019')
})

app.get('/nominations', (req, res) => {
  const page = req.query.page ?? 1
  console.log(`page=${page}`)
  const pageSize = req.query.pageSize ?? 20
  const startIndex = page * pageSize
  const endIndex = startIndex + +pageSize
  const nomineesForPage = goldenGlobesData.slice(startIndex, endIndex)
  const returnObject = { 
    pageSize: pageSize,
    page: page,
    maxPages: parseInt(goldenGlobesData.length/pageSize),
    goldenGlobesNominees: goldenGlobesData.length, 
    result: nomineesForPage, 
  }
  res.json(returnObject)
})

app.get('/year/:year', (req, res) => {
  const year = req.params.year
  const { win } = req.query
  let fromYear = goldenGlobesData.filter((item) => item.year_award === +year)

  if (win) {
    fromYear = fromYear.filter((item) => item.win)
  }

  res.json(fromYear)
  })


app.get('/index/:index', (req, res) => {
  const { index } = req.params
  res.json(goldenGlobesData[index])  
})

app.get('/winners/:win')


app.get('/nominated/:nominee', (req, res) =>{
  const { nominee } = req.params
  const nominated = goldenGlobesData.filter((nom) => nom.nominee === nominee)
  res.json(nominated)
})

/*
let results = allResults

if (quaryParameter) {
  results = results.filter(...queryParameter)
}

if (quaryParameter) {
  results = results.filter(...queryParameter)
}*/


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})