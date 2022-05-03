import express from "express";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";
// import members from './data/technigo-members.json';
 import animals from './data/zoo-animals.json';


// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

app.get("/members", (req, res) => {
  //console.log(members);

  res.status(200).json(members);
  //res.json(members)
});

//Entire data set
app.get('/nominations', (req, res) => {
  res.json(goldenGlobesData);
});

//nominations/year/2010
//+ to make year into a number
//http://localhost:8080/nominations/year/2010?win=true
app.get('/nominations/year/:year', (req, res) => {
  const year = req.params.year;
  const showWon = req.query.win;
  console.log({ showWon });
  let nominationsFromYear = goldenGlobesData.filter((item) => item.year_award === +year);

  if (showWon) {
    nominationsFromYear = nominationsFromYear.filter((item) => item.win);
  }

  res.json(nominationsFromYear);
});

//Only the ones which has won
app.get('/nominations/won', (req, res) => {
  //const won = req.params.win;
  const allWon = goldenGlobesData.filter((item) => item.win === true );
  res.json(allWon);
})

app.get("/members/:name", (req, res) => {
  //console.log(req.params);
  const memberByName = members.find(member => member.name === req.params.name);
  res.status(200).json(memberByName);
});

//All animals
app.get("/animals/", (req, res) => {
  console.log(animals);
  res.status(200).json(animals);
});

//Mammal, Bird, Fish...
//animals.animal_type
app.get("/animals/:animal_type", (req, res) => {
  console.log(req.params);
  const animalByType = animals.filter((animal) => animal.animal_type === req.params.animal_type);
  res.status(200).json(animalByType);
});

//Id 
//animals/id/186
app.get("/animals/id/:id", (req, res) => {
  const animalById = animals.find((animal) => animal.id === +req.params.id);
  //console.log(animalById);
  res.status(200).json(animalById);
});





// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
