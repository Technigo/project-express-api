import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import avocadoSalesData from './data/avocado-sales.json'


const port = process.env.PORT || 8080
const app = express()


app.use(cors())
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.send('Happy world')
})

app.get("/avocados", (req, res) => {
  const page = req.query.page ?? 0
  const pageSize = req.query.pageSize ?? 20
  const startIndex = page * pageSize
  const endIndex = startIndex + +pageSize

  const salesForPage = avocadoSalesData.slice(startIndex, endIndex)

  const returnObject = {
    pageSize: pageSize,
    page: page,
    maxPages: parseInt(avocadoSalesData.length / pageSize),
    results: salesForPage,
  }

  res.send(returnObject)
})


app.get("/avocados/:id", (req, res) => {
  const { id } = req.params
  const findById = avocadoSalesData.find(
    (avocado) => avocado.id == id)

  res.send(findById)
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
