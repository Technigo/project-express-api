import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import data from './data/golden-globes.json'

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

//routes 
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/nominations', (req, res) => {
  res.json(data)
})

app.get('/nominations/:nominee', (req, res) => {
  const nominee = req.params.nominee
  const oneNominee = data.filter((item) => item.nominee === nominee)

  res.json(oneNominee)
})


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
