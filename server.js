import express, { response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

//import data
import profanityDictionary from './data/profanity-dictionary.json'

// const data = [
//   {id: 1, word: 'fuck', language: 'english', type: 'sex'},
//   {id: 2, word: 'cunt', language: 'english', type: 'sex'},
//   {id: 3, word: 'cock', language: 'english', type: 'sex'},
//   {id: 4, word: 'balls', language: 'english', type: 'sex'},
//   {id: 5, word: 'bellend', language: 'english', type: 'sex'},
// ]

// Defines the port the app will run on.
const port = process.env.PORT || 8080
const app = express()

// // Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// homepage router?
app.get('/', (req, res) => {
  res.send('asd API!')
})

// entire list/collection/array of elements (first blue level req.)
app.get('/curses', (req, res) => {
  // the server has a collection of data we can access from the client
  res.json(profanityDictionary)
})

// single item from collection/list (second blue level req.) 
// this is not working yet.. "TypeError: Cannot read property 'get' of undefined"
app.get('/curses/:id', (req, res) => {
  const { id } = req.params
  const curseId = profanityDictionary.find((curses) => curses.id === +id)
  if (!curseId) {
    res
    .status(404)
    .send({ error: `No source with id "${id}" found`})
  }
  res.json(curseId)
  // res.json(data[req.params["id"] - 1])
})


// // Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})




// import express, { response } from 'express'
// import bodyParser from 'body-parser'
// import cors from 'cors'

// // If you're using one of our datasets, uncomment the appropriate import below
// // to get started!
// // 
// // import goldenGlobesData from './data/golden-globes.json'
// // import avocadoSalesData from './data/avocado-sales.json'
// // import booksData from './data/books.json'
// // import netflixData from './data/netflix-titles.json'
// // import topMusicData from './data/top-music.json'

// // Defines the port the app will run on. Defaults to 8080, but can be 
// // overridden when starting the server. For example:
// //
// // PORT=9000 npm start
// const port = process.env.PORT || 8080
// const app = express()

// // Add middlewares to enable cors and json body parsing
// app.use(cors())
// app.use(bodyParser.json())

// // Start defining your routes here
// // so this is routes endpoint!
// app.get('/', (req, res) => {
//   // key points with if- statements 
//   // needs to have an else statement with path to response in backend
//   res.send('Hello API!')
//   // can add stuff under here
// })

// // another routes endpoint!
// // array of users that we want to present to client
// // return array from !json!

// //so here is my mini database - if it's in the global scope it can be reached
// // by the other end-points as well. 
// // ID is very important

// const users = [
//   { id: 1, name: "Blob", age: 34 },
//   { id: 2, name: "Bruub", age: 75 },
//   { id: 3, name: "gregg", age: 90 },
//   { id: 4, name: "slime", age: 1 }
// ]

// // entire list/collection/array of elements
// // first blue level req.
// app.get('/users', (req, res) => {
//   // the server has a collection of data we can access from the client
//   res.json(users)
// })

// // ok so it's important how you structure your get

// // single item from collection/list
// // second blue level req. 
// // this is not working yet.. "TypeError: Cannot read property 'get' of undefined"
// app.get('/users/:id', (req, res) => {
//   // using params when creating end-points 
//   // this is an object that has ID in ''
//   const { id } = req.params
//   // this returns a string, but with + it converts it to an int
//   const user = users.find((user) => user.id === +id)
//   // handling when id is not part of the database
//   // if(!user){

//   // }
//   response.json(user)
// })

// // Start the server
// app.listen(port, () => {
//   // the server has started, what shall it do know?
//   // usually we just console.log it to see that it works
//   // this message is showed in terminal
//   console.log(`Server running on http://localhost:${port}`)
// })


// // query filter all the users that match that name
// // we still get an array

// // app.get('/users', (req, res) => {
// // const {name} = req.query
// // if(name) {
// //   const filteredUsers = users.filter(user => user.name === name)
// //   response.jason(filteredUsers)
// // } else{
// //   response.json(users)
// // }
// // }
// // )