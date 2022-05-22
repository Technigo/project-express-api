import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints"

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

import recipes from "./data/recipes.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
// app.get("/", (req, res) => {
//   res.send("Hello Technigo!");
// });

app.get('/', (req, res) => {
  // res.send(`Welcome to Dorothea's recipe API!`)
  res.send(listEndpoints(app))
})

//Main endpoint with the option to filter by type of recipe and name
// Types: bread, meat, chicken, veggies


app.get('/recipes', (req, res) => {

  const { name, type } = req.query
  
  let recipesToSend = recipes
  
  if (name) {
    recipesToSend = recipesToSend.filter(
      (item) => item.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    )
  }
  if (type) {
    recipesToSend = recipesToSend.filter(
      (item) => item.type.toLowerCase() === type.toLowerCase()
    )
  }
  
  res.json({recipesToSend})
  
  })


//Endpoint for individual object

app.get('/recipes/:index', (req, res) => {
  const {index} = req.params

  const recipeId = recipes.find(recipe => recipe.id === +index)

  if (!recipeId) {
    console.log("No recipe found");
    res.status(404).send('No recipe found')
  } else {
    res.json(recipeId)
  }
});

//Also endpoint for individual object

app.get('/recipes/id/:index', (req, res) => {
  const {index} = req.params

  const recipeId = recipes.find(recipe => recipe.id === +index)

  if (!recipeId) {
    console.log("No recipe found with that ID");
    res.status(404).send('No recipe found with that ID')
  } else {
    res.json(recipeId)
  }
});


app.get('/vegetarian', (req, res) => {

    const filteredRecipes = recipes.filter( recipe => recipe.vegetarian === true )
    res.json(filteredRecipes)

})



// app.get('/recipes/type/:type', (req, res) => {
//   const {typeinput} = req.params

//   const recipesByType = recipes.filter((item) => item.type === typeinput)

//   res.json(recipesByType)

// })


// app.get('/recipes/recipe/:name', (req, res) => {
  
// const {name} = req.params
// const recipeByName = recipes.find(item => item.id === name)

// if (!recipeByName) {
// res.status(404).json({
//  response: 'No recipe with that name',
//  success: false
// }) 
// } else {
//   res.status(200).json({
//     response: recipeByName,
//     success: true
//   })
// }
// });




// Start the server
app.listen(port, () => {
  console.log(`Server running on: ${port}`);
});


