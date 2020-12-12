import express from "express"
// Main go-to for starting up APIs in Javascript in Node. Handy, mature tool for handling APIs in JS in the back-end.

const app = express()
// This variable will allow us to create a server, which is a program that allows us to listen to incoming transmissions on a port. 65,000 ports on the computer.

const users = [
  { id: 1, name: "Bob", age: 34 },
  { id: 2, name: "Sue", age: 31 },
  { id: 3, name: "Jim", age: 24 },
  { id: 4, name: "Ali", age: 43 },
]

// This is an endpoint to return an array.
// Function will receive a request and response variable which we can modify.
// We spec. a path, and then access a request, and formulate a response TO the client. 
app.get('/', (request, response) => {
  // For every endpoint you have, you have to send a response at some point. 
  response.send("Hello API! I hope you have good documentation.")
})
// SIDETRACKED BETWEEN 1050-1115.

// This is an endpoint to return a single result.
app.get('/users/:id', (request, response) => {
  console.log(request.params)
  // response.send(request.params) – WHAT'S THIS? UNCOMMENTING CAUSES IT TO NOT WORK.
  // Deconstruct the request params object. 
  const { id } = request.params;
  const user = users.find(user => user.id === +id) // + makes it a number
  // const user = users.find(user => user.id === parseInt(id)) 
  // const user = users.find(user => user.id == parseInt(id)) // + makes it a number
  response.json(user)
})

// We'll mostly use "send" and "json"w
app.get('/users', (request, response) => {
  response.json(users)
})

// Gives it a port and a function. Listen on port 8080, and the function is "what should I do when it starts?"
app.listen(8080, () => {
  // 8080 is a port on my comp open to incoming data. 
  // Code will be triggered when the server has started – "what should I do when the server starts?"
  console.log("Hello console, the server is running")
})
