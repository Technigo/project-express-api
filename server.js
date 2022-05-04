import express from "express";
import cors from "cors";
import data from './data/hammarby.json'

import hammarby from './data/hammarby.json'

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Forza Bajen!");
});

// ex: http://localhost:8080/hammarby?number=2 or http://localhost:8080/hammarby?age=18&position=striker
app.get('/hammarby', (req, res) => {
  const { name, age, position, number, born, nationality, goal } = req.query

  let allPlayers = hammarby

  if (name) {
    allPlayers = allPlayers.find((player) => player.name === name)
  } 
  
  if (age) {
    allPlayers = allPlayers.filter((player) => player.age === +age)
  } 
  
  if (position) {
    allPlayers = allPlayers.filter((player) => player.position === position)
  } 
  
  if (number) {
    allPlayers = allPlayers.find((player) => player.shirt_number === +number)
  }

  if (born) {
    allPlayers = allPlayers.filter((player) => player.year_born === +born)
  }

  if (nationality) {
    allPlayers = allPlayers.filter((player) => player.nationality === nationality)
  }

  if (goal) {
    allPlayers = allPlayers.filter((player) => player.done_goal === goal)
  }

  res.status(200).json({
    data: allPlayers,
    success: true
  })
})

// Filter out player - age
// Ex: http://localhost:8080/hammarby/ages/27
app.get('/hammarby/ages/:age', (req, res) => {
  const age = req.params.age
  let ageOfPlayer = data.filter((item) => item.age === +age)

  if (!ageOfPlayer.length) {
    res.status(404).send(`Sorry no player in Hammarby is the age of ${age}.`)
  } else {
    res.json(ageOfPlayer)
  }
})

// Filter out player - Done goal for Hammarby?
// Ex: http://localhost:8080/hammarby/goals/no
app.get('/hammarby/goals/:goal', (req, res) => {
  const goal = req.params.goal
  let doneGoal = data.filter((item) => item.done_goal === goal)

  res.json(doneGoal)
})

// Filter out player - position
// Ex: http://localhost:8080/hammarby/positions/striker or http://localhost:8080/hammarby/positions/striker?goal=yes
app.get('/hammarby/positions/:position', (req, res) => {
  const position = req.params.position

  const { goal } = req.query;

  let whichPosition = data.filter((item) => item.position === position)

  if (goal) {
    whichPosition = whichPosition.filter((item) => item.done_goal === goal) //Shows the position based player who has done a goal
  } 

  if (!whichPosition.length) {
    res.status(404).send(`Sorry nothing found.`)
  } else {
    res.json(whichPosition)
  }
  
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
