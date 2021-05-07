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
  res.json({ data: exercisesData })
})

// Endpoint to get a exercise by id
app.get('/exercises/id/:id', (req, res) => {
  const { id } = req.params
  const singleExercise = exercisesData.find(
    (exercise) => exercise.exerciseID === +id
  )
  if (singleExercise) {
    res.json({ data: singleExercise })
  } else {
    res.status(404).send({ error: `No exercise with id ${id}!` })
  }
})

// Endpoint to get a exercise by exercise name
app.get('/exercises/name/:name', (req, res) => {
  const { name } = req.params
  const exerciseNames = exercisesData.find(
    (exercise) => exercise.name === name.toLowerCase()
  )
  if (exerciseNames) {
    res.status(200).json({ data: exerciseNames })
  } else {
    res.status(404).send({ error: `No exercise with name: ${name}!` })
  }
})

// Endpoint for all multi-joint exercises
app.get('/exercises/category/multi_joint', (req, res) => {
  const multiJointExercise = exercisesData.filter(
    (exercise) => exercise.category === 'multi-joint exercise'
  )
  res.status(200).json({ data: multiJointExercise })
})

// Endpoint for all single-joint exercises
app.get('/exercises/category/single_joint', (req, res) => {
  const singleJointExercise = exercisesData.filter(
    (exercise) => exercise.category === 'single-joint exercise'
  )
  res.status(200).json({ data: singleJointExercise })
})

// Lists exercises by target muscle
app.get('/exercises/target_muscle/:muscles', (req, res) => {
  const { muscles } = req.params
  const targedMuscles = exercisesData.filter(
    (muscle) => muscle.target_muscle === muscles.toLowerCase()
  )
  if (targedMuscles.length > 0) {
    res.json({ data: targedMuscles })
  } else {
    res
      .status(404)
      .send({ error: `No exercise with target muscle: ${muscles}!` })
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}/`)
})
