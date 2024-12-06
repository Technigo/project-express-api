import express from "express";
import cors from "cors";
import animals from "./data/animals.json"



// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 9000;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start "page"
app.get("/", (req, res) => {
  res.send("The animals of the world!");
});

// Get alla animals from array
app.get("/animals", (req, res) => {
  res.send(animals);
});


// Get all animals from id
app.get("/animals/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const animalId = animals.find((animal) => animal.id === id);
  if (animalId) {
    res.json(animalId); // Send the specific animal
  } else {
    res.status(404).json({ error: "Animal not found" });
  }
});


// Get animals from specific regions
app.get("/regions/:region", (req, res) => {
  const region = req.params.region;

  const specificRegion = animals.filter((animal) => 
    animal.region.toLowerCase().includes(region)
  );
  
  if (specificRegion) {
    res.json(specificRegion);
  } else {
    res.status(404).json({ error: "Animal not found" });
  }

});


// Get all animals specific trait
app.get("/traits/:name", (req, res) => {
  const name = req.params.name; // Get the name from the route 
  const animal = animals.find((a) => a.name.toLowerCase() === name); // Find the animal by name

  if (animal) {
    res.json({ name: animal.name, trait: animal.trait }); // Respond with the name and trait
  } else {
    res.status(404).json({ error: "Animal not found" }); // Animal not found
  }

});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

