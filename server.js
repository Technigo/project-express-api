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
  res.json(goldenGlobesData)
});

app.get('/year/:year', (req, res) => {
  const year = req.params.year
  const win = req.query
  let fromYear = goldenGlobesData.filter((item) => item.year_award === +year)
  console.log(req.query)

  if (win) {
    fromYear = fromYear.filter((item) => item.win)
  }
  res.json(fromYear)
})

app.get('/index/:index', (req, res) => {
  const { index } = req.params
  console.log(index)
  res.json(goldenGlobesData[index])  
})

app.get('/nominated/:nominee', (req, res) =>{
  const { nominee } = req.params
  console.log(nominee)
  const nominated = goldenGlobesData.filter((nom) => nom.nominee === nominee)
  res.json(nominated)
})




// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})