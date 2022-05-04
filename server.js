import express from "express";
import cors from "cors";

import animals from './data/zoo-animals.json';
import { all } from "express/lib/application";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

//Get all animals
app.get("/animals/", (req, res) => {
  res.status(200).json(animals);
});

//Mammal, Bird, Fish...
//animals.animal_type
app.get("/animals/type/:animalType", (req, res) => {

  const { animalType } = req.params; 
  const animalByType = animals.filter(
    (animal) => animal.animal_type.toLowerCase() === animalType.toLowerCase()
  );
  
  res.status(200).json(animalByType);

  // if (!animalByType) {
  //   res.status(404).json({
  //     data: 'Not found',
  //     success: false
  //   });
  // } else {
  //   res.status(200).json({
  //     data: animalByType,
  //     success: true
  //   });
  // }

});

//Id 
//animals/id/186
app.get("/animals/id/:animalId", (req, res) => {

  const { animalId } = req.params;
  const animalById = animals.find(
    (animal) => animal.id === +animalId
  );

  if (!animalById) {
    res.status(404).json({
      data: 'Not found',
      success: false
    }); 
  } else { 
      res.status(200).json({
        data: animalById,
        success: true
      });
  }
});

//Type and geo_range
// animals?type=fish&geo=Australia
app.get("/animals", (req, res) => {
  const { type, geo } = req.query;

  let allAnimals = animals;

  if (type) {
    allAnimals = allAnimals.filter(
      (animal) => animal.animal_type.toLowerCase() === type.toLowerCase()
    );
  }

  if (geoRange) {
    allAnimals = allAnimals.filter(
      (animal) => animal.geo_range.toLowerCase() === geo.toLowerCase()
    );
  }

  res.status(200).json({
    data: allAnimals,
    success: true
  });

});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
