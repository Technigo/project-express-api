import express from "express"
import cors from "cors"
import listEndpoints from "express-list-endpoints"
import cats from "./data/cats.json"


// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start

const port = process.env.PORT || 9000
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here

// Documentation Route
app.get("/", (request, response) => {
  const endpoints = listEndpoints(app) // Fetch all available routes
  response.json({
    message: "Miao Miao! Welcome to the Cats API!  Here you can find all types of cats. Below are the available endpoints",
    endpoints: endpoints // Send the list of endpoints as JSON
  })
})

// Combined cats route filtering on all cats and cats with category query filter for personality, fur length and commonality. 

app.get("/cats", (request, response) => {  // http://localhost:9000/cats -route for displaying all cat breeds. 
  const {personality, fur_length, commonality}= request.query

  let filteredCats = cats
  
  if (personality) {
    filteredCats = cats.filter(
      cat => cat.personality.toLowerCase() === personality.toLowerCase()  // ex. http://localhost:9000/cats?personality=calm  //Filtered on personality in query param. 
    )
  }

    if (fur_length) {
     filteredCats= cats.filter (
      cat => cat.fur_length.toLowerCase() === fur_length.toLowerCase()
    )
  }

  if (commonality) {
    filteredCats= cats.filter (
      cat=> cat.commonality.toLowerCase() === commonality.toLowerCase ()
    )
  }

    if (filteredCats.length>0) {
      response.json (filteredCats) //Return matching cats
    } else {
      response.status(404).send("No cats found with the specified criteria") //if no matches when writing a cat personality, fur_length or commonality, this message will show. 
    }
  })


  app.get ("/cats/:breed", (request, response) => {
    const breed = request.params.breed.trim().toLowerCase()

    const cat = cats.find (cat => cat.breed.toLowerCase() === breed)  //Find specific cat breed.
  if (cat) {
    response.status (200).json (cat)
  } else {
    response.status (400).send ("No breed found with that name")
  }
})
  
  app.get("/cats/:id", (request, response) => {
    const id = request.params.id
  
    const cat = cats.find(cat => cat.id === +id)   //Find specific ID for a cat.
  if (cat) {
  response.status(200).json(cat)
  } else {
  response.status(404).send("No cat found with that ID")
  }
  })


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});







