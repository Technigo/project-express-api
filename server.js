import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// Using my own data set that shows the dogs of Zurich, Switzerland

import dogs from './data/dogs-in-zurich.json'

// Explaning the different values
// ALTER -> Age
// GESCHLECHT -> Gender
// STADTKREIS -> City Quarter or District
// RASSE1 -> Dog's Primary Breed
// RASSE2 -> Dog's Secondary Breed
// GEBURTSJAHR_HUND -> Dog's Year of Birth
// GESCHLECHT_HUND -> Dog's Gender
// HUNDEFARBE -> Dog's Color

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// My routes
app.get('/about', (req, res) => {
  res.send("Hello! this project is about the dogs living in Zurich, Switzerland. Explaning the different values. ALTER -> Age. GESCHLECHT -> Gender. STADTKREIS -> City Quarter or District. RASSE1 -> Dog's Primary Breed. RASSE2 -> Dog's Secondary Breed. GEBURTSJAHR_HUND -> Dog's Year of Birth. GESCHLECHT_HUND -> Dog's Gender. HUNDEFARBE -> Dog's Color")
})

//Route in plural that shows the whole object with all dogs. Usage of slice-method
app.get('/dogs', (req, res) => {
  const page = req.query.page ?? 0;
  const pageSize = 20;
  const startIndex = page * pageSize;
  const endIndex = startIndex + pageSize;
  const dogsPerPage = dogs.slice(startIndex,endIndex)
  const returnObject = {
    pageSize: pageSize,
    page: page,
    numDogs: dogs.length,
    result: dogsPerPage,
    }
  res.send(returnObject)
})

//Routes that shows dogs from a certain year of birth or a certain dog race. Usage of filter method. 

app.get('/year/:year', (req, res) => {
  const year = req.params.year
  const birthYear = dogs.filter((item) => item.GEBURTSJAHR_HUND === +year)
  res.json(birthYear)
})

app.get('/race/:race', (req, res) => {
  const race = req.params.race
  // const specRace = req.query.specRace
  const dogRace = dogs.filter((item) => item.RASSE1 === race)

  // if statement to choose dogs from certain birth year from this race.
  // if() {

  // }
  res.json(dogRace)
})

//find-method

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
