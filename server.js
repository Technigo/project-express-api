import express from "express";
import cors from "cors";
import flowerData from "./data/old-flowers.json";

// console.log(flowerData.length);

// Defines the port the app will run on.
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

//Raplece ÅÄÖ with A and O in url
function replaceSwedishCharacters(text) {
  return text
    .toLowerCase()
    .replace(/å/g, "a")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o");
}

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Flowers for an old garden");
});

//Get all flowers
app.get("/flowers", (req, res) => {
  res.json(flowerData);
});

//Get one flower based on id
app.get("/flowers/:flowerId", (req, res) => {
  const { flowerId } = req.params;

  const flower = flowerData.find((flower) => +flowerId === flower.id);

  if (flower) {
    res.json(flower);
  } else {
    res.status(404).send("No flower was found");
  }
});

// Get flowers based on color
app.get("/flowers/color/:color", (req, res) => {
  const color = req.params.color.toLowerCase();
  const flowersWithColor = flowerData.filter((flower) =>
    flower.color.some(
      (c) =>
        replaceSwedishCharacters(c.toLowerCase()) ===
        replaceSwedishCharacters(color)
    )
  );

  if (flowersWithColor.length > 0) {
    res.json(flowersWithColor);
  } else {
    res.status(404).send("No flowers with that color were found");
  }
});

// Get flowers based on type
app.get("/flowers/type/:flowerType", (req, res) => {
  const { flowerType } = req.params;
  const sanitizedType = replaceSwedishCharacters(flowerType);

  const flowersWithType = flowerData.filter(
    (flower) =>
      replaceSwedishCharacters(flower.type.toLowerCase()) === sanitizedType
  );

  if (flowersWithType.length > 0) {
    res.json(flowersWithType);
  } else {
    res.status(404).send("No flowers of that type were found");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
