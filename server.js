import express from "express"
import cors from "cors"
import animalsData from "./data/zoo-animals.json"
import expressListEndpoints from "express-list-endpoints"

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get("/", (req, res) => {
  res.send(endpoints)
})

app.get("/animals", (req, res) => {
  let filterAnimals = [...animalsData]

  const animalName = req.query.name
  if (animalName) {
    filterAnimals = filterAnimals.filter((animal) => animal.name.includes(animalName.toLowerCase()))
  }

  const predator = req.query.predator
  if (predator) {
    filterAnimals = filterAnimals.filter((animal) => animal.predator.toString() === predator)
  }

  if (filterAnimals.length === 0 && animalName) {
    res.status(404).send("Sorry, either the animal you searched for doesn't exist or it escaped from the zoo!")
  } else if (filterAnimals.length > 0){
    res.json(filterAnimals)
  } else {
    res.status(404).send("Sorry, looks like the zoo is empty. No animals can be found!")
  }
})

app.get("/animals/:animalId", (req, res) => {
  const id = req.params.animalId
  const animal = animalsData.find(item => item.id === +id)

  if (animal) {
    res.json(animal)
  } else {
    res.status(404).send("Sorry, either that animal doesn't exist or it escaped from the zoo!")
  }
})

app.get("/type/:type", (req, res) => {
  const type = req.params.type
  let filterByType = animalsData.filter(animal => animal.type === type)

  const predator = req.query.predator;
  if (predator) {
    filterByType = filterByType.filter((animal) => animal.predator.toString() === predator)
  }

  if (filterByType.length > 0) {
    res.json(filterByType)
  } else {
    res.status(404).send("Sorry, looks like that sort of animal can't be found in this zoo!")
  }
})

const endpoints = expressListEndpoints(app)

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
