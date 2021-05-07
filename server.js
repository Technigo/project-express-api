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

// Lists exercises by exercise name
app.get('/name/:name', (req, res) => {
  const { name } = req.params
  const queriedExerciseNames = exercisesData.filter(
    (exercise) => exercise.name === name.toLowerCase()
  )
  if (queriedExerciseNames.length > 0) {
    res.status(200).json({ data: queriedExerciseNames })
  } else {
    res
      .status(404)
      .send({ error: `No exercise with name: ${name}!` })
  }
})

// Endpoint for all multi-joint exercises
app.get('/category/multi_joint', (req, res) => {
  const multiJointExercise = exercisesData.filter(
    (exercise) => exercise.category === 'multi-joint exercise'
  )
  if (multiJointExercise) {
    res.status(200).json({ data: multiJointExercise })
  } else {
    res.status(404).json({ error: 'Not found' })
  }
})

// Endpoint for all single-joint exercises
app.get('/category/single_joint', (req, res) => {
  const singleJointExercise = exercisesData.filter(
    (exercise) => exercise.category === 'single-joint exercise'
  )
  if (singleJointExercise) {
    res.status(200).json({ data: singleJointExercise })
  } else {
    res.status(404).json({ error: 'Not found' })
  }
})

// Lists exercises by target muscle
app.get('/target_muscle/:muscles', (req, res) => {
  const { muscles } = req.params
  const queriedTargedMuscles = exercisesData.filter(
    (muscle) => muscle.target_muscle === muscles.toLowerCase()
  )
  if (queriedTargedMuscles.length > 0) {
    res.json({ data: queriedTargedMuscles })
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
