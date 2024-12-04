import express from "express";
import cors from "cors";
import cats from "./data/cats.json"

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 9000;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (request, response) => {
  response.send("Miao miao!");
});

// Combined cats route filtering on all cats and cats with category query filter for breed.
app.get("/cats", (request, response) => {  // http://localhost:9000/cats- route for displaying all cat breeds. 
  const breed = request.query.breed;
  
  if (breed) {
    const filteredCats = cats.filter(
      cat => cat.breed.toLowerCase() === breed.toLowerCase()  // ex. http://localhost:9000/cats?breed=bengal
    );

    if (filteredCats.length>0) {
      response.json (filteredCats) //Return matching cats
    } else {
      response.status(404).send("No cat breed found with that name ") //if no matches when writing a cat breed that does not exist, this message will show. 
    }
    } else {
      response.json (cats) //Return all cats if no name of breed is provided

    }
  })

app.get("/cats/personality/:personality", (request, response) => {
  const personality = request.params.personality
  
  const catFilter = cats.filter (cats => cats.personality.toLowerCase() === personality.toLowerCase())
  if (catFilter.length >0) {  // checks if any cats matched the personality.
    response.status(200).json(catFilter)
    } else {
    response.status(404).send("No personality found with that name ") //if no matches when writing a personality that does not exist, this message will show. 
    }
  })


app.get ("/cats/fur_length/:fur_length", (request, response) => {
  const fur_length = request.params.fur_length

  const catFilter = cats.filter (cats => cats.fur_length.toLowerCase() === fur_length.toLowerCase())
  if (catFilter.length >0){
    response.status (200).json (catFilter)
  } else {
    response.status (404).send ("No fur length found with that type")
  }
})

  
  app.get("/cats/:id", (request, response) => {
  const id = request.params.id
  
  const cat = cats.find(cat => cat.id === +id)
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






