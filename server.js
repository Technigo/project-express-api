// The main go-to for starting APIs in JS, in Node. Really handy, mature tool for handling JS in back-end. 
// Type npm run dev to start
import express, { request, response } from "express"

// nominees is an array
const nominees = require('./data/golden-globes.json')


// This variable will allow us to create a server, which is a program that allows us to listen to incoming transmissions on a port. 65,000 ports on the computer.
const app = express()

app.get('/', (request, response) => {
  // For every endpoint you have, you have to send a response at some point. 
  response.send("Hello (golden) globe!")
})

// 🔹🔹🔹 Endpoint that lists all the nominees since 2010.
app.get('/nominees', (request, response) => {
  // For every endpoint you have, you have to send a response at some point. 
  response.send(nominees)
})

// 🔹🔹🔹 Endpoint that lists all the Golden Globe wins.
app.get('/nominees/winners', (request, response) => {
  const filteredNominees = nominees.filter(nominee => nominee.win === true)
  response.send(filteredNominees)
})

// 🔹🔹🔹 Endpoint that lists all nominees for a year (Golden globe year, not release year)
app.get('/nominees/:year', (request, response) => {
console.log("Yo I'm here now")
  const { year } = request.params
  const filteredNominees = nominees.filter(nominee => nominee.year_award === +year)
  response.send(filteredNominees)
})

// Endpoint that lists all winners for a year
app.get('/nominees/:year/winners', (request, response) => {
  const { year } = request.params

  console.log(year)
  const filteredNominees = nominees.filter(nominee => nominee.year_award === +year)

  filteredNominees = nominees.filter(nominee => nominee.win === true)
  response.send(filteredNominees)
})

// Endpoint that lists all nominees for a person



// Gives it a port and a function. Listen on port 8080, and the function is "what should I do when it starts?"
// TODO: CHANGE TO 8080 BEFORE SUBMITTING.
app.listen(3000, () => {
  // 8080 is a port on my comp open to incoming data. 
  // Code will be triggered when the server has started – "what should I do when the server starts?"
  console.log("Hello console, the server is running")
})
