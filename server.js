import express from "express";
import cors from "cors";
import harryPotterCharactersData from "./data/harry-potter-characters.json";

// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 9000;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Welcome to the Harry potter page!");
});

//Reoute to get all the characters from the json file - or filter by house 
app.get("/harryPotterCharacters", (req, res) => {
  const house = req.query.house;

  // If a 'house' query parameter is provided....
  if (house) {
    const filteredCharacters = harryPotterCharactersData.filter(character =>
      character.house.toLocaleLowerCase() === house.toLocaleLowerCase()
    );
    res.json(filteredCharacters); // ...then return a filtered list based on house 
  } else {
    res.json(harryPotterCharactersData); // No filter = respond with all characters
  }
});
//_____________________________________________________________
app.get("/harryPotterCharacters/role/:role", (req, res) => {
  const role = req.params.role;

  const characterRole = harryPotterCharactersData.filter(character =>
    character.role.toLocaleLowerCase() === role.toLocaleLowerCase()
  );

  if (characterRole.length > 0) {
    res.json(characterRole);
  } else {
    res.status(404).send("No characters found with that role");
  }
});

//_____________________________________________________________
//Sort by id - getting each character based on the id number
app.get("/harryPotterCharacters/:id", (req, res) => {
  const id = req.params.id;

  const harryPotterCharacter = harryPotterCharactersData.find(character => character.id === +id);
  if (harryPotterCharacter) {
    res.status(200).json(harryPotterCharacter);
  } else {
    res.status(404).send("No character found with that id");
  }
});
// //_____________________________________________________________
// Filter by yearIntroduced 
app.get("/harryPotterCharacters/:yearIntroduced", (req, res) => {
  const year = req.params.yearIntroduced;

  //Filter the characters based on the yearIntroduced property
  const charactersIntroducedInYear = harryPotterCharactersData.filter(character => character.yearIntroduced === +year);

  if (charactersIntroducedInYear.length > 0) {
    res.status(200).json(charactersIntroducedInYear);
  } else {
    res.status(404).send("No characters found from that year");
  }
});

//_____________________________________________________________

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
