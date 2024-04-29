import express from "express";
import cors from "cors";


import goldenGlobesData from "./data/golden-globes.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());



// this returns the whole data set
// app is the express object
app.get("/nominations", (req, res) => {
  res.json(goldenGlobesData);
});

app.get("/nominations/:id", (req, res) => {
  const id = req.params.id;
  const nomination = goldenGlobesData[parseInt(id)];
  
  if (nomination) {
    res.json(nomination);
  } else {
    res.status(404).send(`No nomination with id ${id} found.`);
  }
});

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
