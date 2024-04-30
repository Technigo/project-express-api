import express from "express"
import cors from "cors"
import zooAnimalsData from "./data/zoo-animals.json"

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!")
})

app.get("/animals", (req, res) => {
  res.json(zooAnimalsData)
})

app.get("/animals/:animalId", (req, res) => {
  const id = req.params.animalId
  console.log(id)
  const animal = zooAnimalsData.find(item => item.id === +id)
  res.json(animal)
})

app.get("/type/:type", (req, res) => {
  const type = req.params.type
  const onlyOneType = zooAnimalsData.filter(animal => animal.type === type)
  res.json(onlyOneType)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
