const express = require("express");
const cors = require("cors");
const dogs = require("./data/dogs.json");

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