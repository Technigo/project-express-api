import express, { response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

//import data
import profanityDictionary from './data/profanity-dictionary.json'
import profanityCategories from './data/profanity-dictionary-categories.json'

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

// route entire list/collection/array of elements (first blue level req.)
// add lenght per page?
app.get('/curses', (req, res) => {
  const { language, category_id } = req.query
  let curseList = profanityDictionary

  // don't I need some type of handling system if the search goes wrong here?
  
  // query by category_id
  if (category_id) {
    curseList = curseList.filter((curses) => curses.category_id === +category_id)
  }

  // query by language
  if (language) {
    curseList = curseList.filter((curses) => curses.language.toString().toLocaleLowerCase().includes(language.toLocaleLowerCase()))
  }
  res.json(curseList)
})

// rout by single item from collection/list (second blue level req.) 
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

//rout by category
app.get('/categories', (req, res) => {
  res.json(profanityCategories)
})

// // Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})