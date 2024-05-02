import express from "express";
import cors from "cors";
import expressListEndpoints from "express-list-endpoints";
import goldenGlobesData from "./data/golden-globes.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
// express is the framework.
app.use(cors());
app.use(express.json());

// this returns the whole data set
// app is the express object. app.get is end point functions ... a middleware function runs for every request.
app.get("/nominations", (req, res) => {
  res.json(goldenGlobesData);
});

app.get("/nominations/:id", (req, res) => {
  const id = req.params.id;
  const nomination = goldenGlobesData[parseInt(id)];

  if (nomination) {
    res.json(nomination);
  } else {
    // remmber 404 means "not found". if it start with a 2 evertyhing is ok. if it starts with a 4 or 5 something is wrong. 4 means your request is wrong. 5 means the server is wrong.
    res.status(404).send(`No nomination with id ${id} found.`);
  }
});

// Start defining your routes here
app.get("/", (req, res) => {
  res.send(expressListEndpoints(app));
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
