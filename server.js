import express from "express";
import cors from "cors";

import animals from './data/zoo-animals.json';

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
app.get("/animals/type/:animal_type", (req, res) => {
  const animalByType = animals.filter((animal) => animal.animal_type.toLowerCase() === req.params.animal_type.toLowerCase());
  
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
app.get("/animals/id/:id", (req, res) => {
  const animalById = animals.find((animal) => animal.id === +req.params.id);
  //console.log(animalById);

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


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
