import express from "express";
import cors from "cors";
import expressListEndpoints from "express-list-endpoints";
import topMusicData from "./data/top-music.json";

console.log(topMusicData);

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 3000;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app);
  res.json(endpoints);
});

app.get("/top-music", (req, res) => {
  res.json(topMusicData);
});

app.get("/top-music/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const result = topMusicData.find((item) => item.id === id);

  if (!result) {
    res.status(404).json({ message: "Not Found" });
  } else {
    res.json(result);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
