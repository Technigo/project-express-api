import express from "express";
import cors from "cors";

import animals from './data/zoo-animals.json';

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req,res) => {
  res.send(
    {"Info":"This api shows information about different animals, where they live, what they eat and what type of animal they are.",
    "Routes": [{
      "/animals": "Shows a list with all of the animals",
      "/id": "Shows an animal with a specific id",
      "/type": "Shows animals with a specific type (mammal, bird, fish, reptile...)"
    }],
    "Querys": [{
      "animals/typegeodiet?type=${type}": "Shows for example all birds",
      "animals/typegeodiet?type=${geo}": "Shows for example all animals in Asia",
      "animals/typegeodiet?type=${diet}": "Shows for example all animals that eat fish",
      "animals/typegeodiet?type=${type}&geo=${geo}&diet=${diet}": "Shows for example all mammals in Africa that eat leaves",
    }]
    }
  );
});

//Get all animals
app.get("/animals", (req, res) => {
  res.status(200).json(animals);
});

//Type of animal (mammal, bird, fish...)
app.get("/animals/type/:animalType", (req, res) => {

  const { animalType } = req.params; 
  const animalByType = animals.filter(
    (animal) => animal.animal_type.toLowerCase() === animalType.toLowerCase()
  );

  if (animalByType.length === 0) {
    res.status(404).json({
      data: 'Not found',
      success: false
    });
  } else {
    res.status(200).json({
      data: animalByType,
      success: true
    });
  }
});

//Id of the animal 
app.get("/animals/id/:animalId", (req, res) => {

  const { animalId } = req.params;
  const animalById = animals.find(
    (animal) => animal.id === +animalId
  );

  if (!animalById) {
    res.status(404).json({
      data: 'There is no animal with that id',
      success: false
    }); 
  } else { 
      res.status(200).json({
        data: animalById,
        success: true
      });
  }
});

//Query with type, geo_range and diet for example fishes in africa that eat fish
// animals/typegeodiet?type=fish&geo=africa&diet=fish
app.get("/animals/typegeodiet", (req, res) => {
  const { type, geo, diet } = req.query;

  let allAnimals = animals;

  if (type) {
    allAnimals = allAnimals.filter(
      (animal) => animal.animal_type.toLowerCase() === type.toLowerCase()
    );
  }

  if (geo) {
    allAnimals = allAnimals.filter(
      (animal) => animal.geo_range.toLowerCase().includes(geo.toLowerCase())
    );
  }

  if (diet) {
    allAnimals = allAnimals.filter(
      (animal) => animal.diet.toLowerCase().includes(diet.toLowerCase())
    );
  }

  if (allAnimals.length === 0) {
    res.status(404).json({
      data: 'Not found',
      success: false
    });
  } else {
    res.status(200).json({
      data: allAnimals,
      success: true
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
