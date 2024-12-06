const listEndpoints = require('express-list-endpoints');
const express = require("express");
const cors = require("cors");
const dogs = require("./data/dog-breeds.json");

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/dogs/:id", (req, res) => {
  const id = req.params.id;
  console.log("Requested ID:", id, "Type:", typeof id);
  
  const dog = dogs.find(dog => {
    return dog.id === parseInt(id);
  });
  
  if (!dog) {
    res.status(404).json({ error: "Dog breed not found" });
  } else {
    res.json(dog);
  }
});

app.get("/dogs", (req, res) => {
  const category = req.query.category;
  const filteredDogs = category 
    ? dogs.filter(dog => dog.category === category)
    : dogs;
  res.json(filteredDogs);
});

app.get("/", (req, res) => {
  const endpoints = listEndpoints(app);
  res.json({
    description: "Dog Breeds API - Information about different dog breeds",
    endpoints: endpoints
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});