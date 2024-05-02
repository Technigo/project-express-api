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

  if (filterAnimals.length > 0) {
    res.json(filterAnimals)
  } else {
    res.status(404).send("Sorry, looks like the animal you searched for has escaped from the zoo!")
  }
})

app.get("/animals/:animalId", (req, res) => {
  const id = req.params.animalId
  console.log(id)
  const animal = animalsData.find(item => item.id === +id)
  res.json(animal)
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
    res
      .status(404)
      .send(
        "Sorry, looks like that sort of animal can't be found in this zoo!"
      )
  }
})

const endpoints = expressListEndpoints(app)

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
