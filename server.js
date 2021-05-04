/* eslint-disable linebreak-style */
// eslint-disable linebreak-style 
import express, { response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import exercisesData from './data/exercises.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
// Endpoint to get all exercises
app.get('/exercises', (request, response) => {
  const { name } = request.query
  if (name) {
    const filteredExercises = exercisesData.filter(exercise => exercise.name.includes(name)) 
    response.json(filteredExercises)
  }
  response.json(exercisesData)
})

// Endpoint to get a exercise
app.get('/exercises/:id', (request, response) => {
  const { id } = request.params
  const exercise = exercisesData.find(exercise => exercise.exerciseID === +id)
  if (!exercise) {
    response.status(404).send(`No exercise with id ${id}!`)
  }
  response.json(exercise)
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
