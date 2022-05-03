import express from "express";
import cors from "cors";

import nasaAstronauts from "./data/nasa-astronauts.json";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Astronauts!");
});

app.get("/astronauts", (req, res) => {
  res.status(200).json({
    success: true,
    astronauts: nasaAstronauts
  })
});

app.get("/astronauts/:id", (req, res) => {
  const { id } = req.params;
  const specificAstronaut = nasaAstronauts.find((item) => item.id === +id);
  if (!specificAstronaut) {
    res.status(404).json({
      success: false, 
      status_code: 404, 
      status_message: "Astronaut not found" 
    })
  }
  res.status(200).json({ 
    success: true,
    astronaut: specificAstronaut 
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});