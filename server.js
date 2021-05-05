/* eslint-disable linebreak-style */
import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

import exercisesData from './data/exercises.json'

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())

// Lists all endpoints
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

// Lists all exercises
app.get('/exercises', (req, res) => {
  res.json(exercisesData)
})

// Endpoint to get a exercise by id
app.get('/exercises/:id', (req, res) => {
  const { id } = req.params
  const queriedExercise = exercisesData.find(
    (exercise) => exercise.exerciseID === +id
  )
  if (queriedExercise) {
    res.json({ data: queriedExercise })
  } else {
    res.status(404).send({ error: `No exercise with id ${id}!` })
  }
})
/*
app.get('/exercises', (req, res) => {
  const { name } = req.query
  if (name
    const filteredExercises = exercisesData.filter(
      (exercise) => {
        return (exercise.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    )},
    res.json(filteredExercises)
  }
  res.json(exercisesData)
}) */

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}/exercises`)
})
