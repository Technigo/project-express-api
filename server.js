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

// Function to find a topic name
const findTopicName = (topics, topicName) => {
  return topics.find((topic) => topic.name === topicName);
};

// Function to find topic with specified name
const findSubTopics = (topics, topicName) => {
  const topic = topics.find((topic) => topic.name === topicName);

  // If topic is found then return it´s subtopic, if not return null
  return topic ? topic.subtopics : null;
};

// // Start defining your routes here
// Get welcome text
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

// Route to get all topics
app.get("/topics", (req, res) => {
  res.json(topics);
});

// Get all topic names
app.get("/topics/name", (req, res) => {
  const topicNames = extractTopicNames();
  res.json(topicNames);
});

// Get a specific topic by name
// localhost:8000/topics/JavaScript%20basics
app.get("/topics/:name", (req, res) => {
  const topicName = req.params.name;

  const topic = findTopicName(topics, topicName);

  if (topic) {
    res.json(topic);
  } else {
    res.status(404).json({ error: "Topic not found" });
  }
});

// Get all subtopics of a specific topic
app.get("/topics/:name/subtopics", (req, res) => {
  const topicName = req.params.name;

  const subtopics = findSubTopics(topics, topicName);

  if (subtopics) {
    res.json(subtopics);
  } else {
    res.status(404).json({ error: "Subtopics not found" });
  }
});

// Get all questions related to a specific topic

// Search for topics or questions by keyword

// Get all topics or questions with a specific difficulty level

// Get all topics or questions sorted by difficulty

// Get all topics with a specific tag

// Get all questions with a specific tag

// // Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
