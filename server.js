import express from "express";
import expressListEndpoints from "express-list-endpoints"
import cors from "cors";
import goldenGlobesData from "./data/golden-globes.json";

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

  
// Start defining your routes here
app.get("/", (req, res) => {

const endpoints = expressListEndpoints(app)
  res.json(endpoints);
});

app.get("/nominations", (req, res) => {
  res.json(goldenGlobesData)
})

// app.get("/endpoints", (req, res) => {
//   const endpoints = expressListEndpoints(app)
//   res.json(endpoints)
// })
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
