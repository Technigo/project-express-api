import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// Using my own data set that shows the dogs of Zurich, Switzerland

import dogs from './data/dogs-in-zurich.json'

// Explaining the different values
// ALTER -> Age
// GESCHLECHT -> Gender
// STADTKREIS -> City Quarter or District
// RASSE1 -> Dog's Primary Breed
// RASSE2 -> Dog's Secondary Breed
// GEBURTSJAHR_HUND -> Dog's Year of Birth
// GESCHLECHT_HUND -> Dog's Gender
// HUNDEFARBE -> Dog's Color

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// My routes
// "First page" - the "about" route - giving instructions on how to interpret the json for non german speaking.
app.get('/', (req, res) => {
  res.send("<strong>Hello!</strong> This project shows all living dogs in Zurich, Switzerland. <br><br> <i>Explaning the different values.</i> <ul><li>ALTER -> Age.</li> <li>GESCHLECHT -> Gender.</li> <li>STADTKREIS -> City Quarter or District.</li> <li>RASSE1 -> Dog's Primary Breed.</li> <li>RASSE2 -> Dog's Secondary Breed.</li> <li>GEBURTSJAHR_HUND -> Dog's Year of Birth.</li> <li>GESCHLECHT_HUND -> Dog's Gender.</li> <li>HUNDEFARBE -> Color of the Dog.</li></ul> <h4>Instructions</h4> Enter '/dogs' to see all dogs. Enter '/dogs/{id}' to single out ONE dog. Ex. '/dogs/126'. Enter '/year/{year}' to see all dogs born that year. Ex. '/year/2011'. <br> Enter '/dogs/{breed}' to see all dogs of a certain breed. Ex. '/dogs/Weimaraner' ")
})

//Route in plural that shows the whole object with all dogs. Usage of slice-method to create pages.
// Usage of query parameter to specify the different pages. 
app.get('/dogs', (req, res) => {
  const page = req.query.page ?? 0;
  const pageSize = 20;
  const startIndex = page * pageSize;
  const endIndex = startIndex + pageSize;
  const dogsPerPage = dogs.slice(startIndex,endIndex)
  const returnObject = {
    resultsPerPage: pageSize,
    pageNumber: +page,
    numDogs: dogs.length,
    numPages: dogs.length / pageSize,
    result: dogsPerPage,
    }
  res.send(returnObject)
})

// Method to achieve sending only one result back. Usage of find method.
app.get('/dogs/:id', (req, res) => {
  const { id } = req.params
  const aDog = dogs.find((dog) => dog.HALTER_ID === +id )

// Checking to see if this dog exists. Otherwise sending back an error message saying that the dog with that ID does not exist.
  if(!aDog) {
    res.status(404)
    res.send({error: `Sorry, this dog does not exist`})
  } else {
    res.json(aDog)
  }
})

//Routes that show dogs from a certain year of birth or a certain dog breed. Usage of filter method. 

app.get('/year/:year', (req, res) => {
  const year = req.params.year
  const page = req.query.page ?? 0;
  const pageSize = 20;
  const startIndex = page * pageSize;
  const endIndex = startIndex + pageSize;
  const birthYear = dogs.filter((item) => item.GEBURTSJAHR_HUND === +year)
  const dogsPerPage = birthYear.slice(startIndex,endIndex)
  const returnObject = {
    resultsPerPage: pageSize,
    pageNumber: +page,
    numDogs: birthYear.length,
    numPages: Math.round(birthYear.length / pageSize),
    result: dogsPerPage,
    }
  res.send(returnObject)
})

//Route for showing a specific breed. Using slice to create pages. Using regex to be able to allow the user typing Irish Setter as irishsetter.  

app.get('/breed/:breed', (req, res) => {
  const { breed } = req.params
  const dogBreed = dogs.filter((item) => item.RASSE1.toLowerCase().replace(/\s+/g, '') == breed.toLowerCase())
  const page = req.query.page ?? 0;
  const pageSize = 20;
  const startIndex = page * pageSize;
  const endIndex = startIndex + pageSize;
  const dogsPerPage = dogBreed.slice(startIndex,endIndex)
  const returnObject = {
    resultsPerPage: pageSize,
    pageNumber: +page,
    numDogs: dogBreed.length,
    numPages: Math.round(dogBreed.length / pageSize),
    result: dogsPerPage,
    }
  res.send(returnObject)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
