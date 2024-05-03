import express from "express"
import cors from "cors"
import expressListEndpoints from 'express-list-endpoints'

import sneakerData from "./data/sneakers.json"

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!

// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json())

// Route handler
//http://localhost:8080/
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app)
  res.json(endpoints)
});

//Get all sneakers
//http://localhost:8080/sneakers
app.get("/sneakers", (req, res) => {
  res.json(sneakerData)
})

//Get only one sneaker based on id
//Example on how the URL could look like: http://localhost:8080/sneakers/12
app.get("/sneakers/:sneakerId", (req, res) => {
  //Destruture the id
  const { sneakerId } = req.params

  const sneaker = sneakerData.find(sneaker => +sneakerId === sneaker.id)


  if (sneaker) {
    res.json(sneaker)
  } else {
    res.status(404).send("No sneaker was found, please try again.")
  }
  
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});


