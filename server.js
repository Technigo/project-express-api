import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
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
  const endpoints = listEndpoints(app);
  res.json({
    message: "Welcome to the Harry Potter page!",
    endpoints: endpoints
  });
});

// Route to get all characters or filter by house, year, role
app.get("/harryPotterCharacters", (req, res) => {
  const house = req.query.house; // Query parameter for house
  const year = req.query.yearIntroduced; // Query parameter for yearIntroduced
  const role = req.query.role; // Query parameter for role

  // Filter by house
  if (house) {
    const filteredCharacters = harryPotterCharactersData.filter(character =>
      character.house.toLowerCase() === house.toLowerCase()
    );
    res.json(filteredCharacters);
  }
  // Filter by role
  else if (role) {
    const characterRole = harryPotterCharactersData.filter(character =>
      character.role.toLowerCase() === role.toLowerCase()
    );
    res.json(characterRole);
  }
  // Filter by yearIntroduced
  else if (year) {
    const charactersIntroducedInYear = harryPotterCharactersData.filter(character =>
      character.yearIntroduced === +year
    );
    res.json(charactersIntroducedInYear);
  }
  else {
    res.json(harryPotterCharactersData);  // No filters = return all characters

  }
});


//Sort by id - getting each character based on their unique id number
app.get("/harryPotterCharacters/:id", (req, res) => {
  const id = req.params.id;

  const harryPotterCharacter = harryPotterCharactersData.find(character => character.id === +id);
  if (harryPotterCharacter) {
    res.status(200).json(harryPotterCharacter);
  } else {
    res.status(404).send("Sorry - no character found with that id");
  }
});

// Sort by name - getting each character based on their unique name (adding the extra /name "prefix" to distinguish this route from the /id route)
app.get("/harryPotterCharacters/name/:name", (req, res) => {
  const name = req.params.name.toLowerCase();

  const harryPotterCharacterName = harryPotterCharactersData.find(character =>
    character.name.toLowerCase() === name
  );

  if (harryPotterCharacterName) {
    res.status(200).json(harryPotterCharacterName);
  } else {
    res.status(404).send("Sorry - no character found with that name");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});