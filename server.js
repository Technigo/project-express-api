import express from "express";
import cors from "cors";
import { topics } from "./data/topics.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8000;
const app = express();

// // Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Function to extraxt all topic names
const extractTopicNames = () => topics.map((topic) => topic.name);

// // Start defining your routes here
// http://localhost:8000/
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

// Route to get all topics
app.get("/topics", (req, res) => {
  res.json(topics);
});

// Route to get name of all topics
app.get("/topics/name", (req, res) => {
  const topicNames = extractTopicNames();
  res.json(topicNames);
});

// // Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
