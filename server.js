import express from "express";
import cors from "cors";
import expressListEndpoints from "express-list-endpoints";
import { topics } from "./data/topics.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start

const port = process.env.PORT || 8000;
let app = express();


// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// ____________________ FUNCTIONS ____________________

// Function to extract param
const extractParam = (req, param) => {
  return req.params[param];
};

// Function to extract all topic names
const extractTopicNames = () => topics.map((topic) => topic.name);

// Function to find a topic name
const findTopicByName = (topics, topicName) => {
  return topics.find((topic) => topic.name === topicName);
};

// Function to find topic with specified name
const findSubTopics = (topics, topicName) => {
  const topic = topics.find((topic) => topic.name === topicName);

  // If topic is found then return it´s subtopic, if not return null
  return topic ? topic.subtopics : null;
};

// ____________________ ROUTES ____________________

// // Start defining your routes here
app.route("/").get((req, res) => {
  const endpoints = expressListEndpoints(app);
  res.send(endpoints);
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
// /topics/JavaScript%20basics
app.get("/topics/:name", (req, res) => {
  const topicName = extractParam(req, "name");

  // Passing topics and topics name as params
  const topic = findTopicByName(topics, topicName);

  if (topic) {
    res.json(topic);
  } else {
    res.status(404).json({ error: "Topic not found" });
  }
});

// Get all subtopics of a specific topic
// /topics/JavaScript%20basics/subtopics
app.get("/topics/:name/subtopics", (req, res) => {
  const topicName = extractParam(req, "name");
  // Passing topics and topics name as params
  const subtopics = findSubTopics(topics, topicName);

  if (subtopics) {
    res.json(subtopics);
  } else {
    res.status(404).json({ error: "Subtopics not found" });
  }
});

// Get all questions related to a specific topic
app.get("/topics/:name/questions", (req, res) => {
  const topicName = extractParam(req, "name");
  // Passing topics and topics name as params
  const topic = findTopicByName(topics, topicName);

  res.json(topic);
});

// Search for topics or questions by keyword

// Get all topics or questions with a specific difficulty level

// Get all topics or questions sorted by difficulty

// Get all topics with a specific tag

// Get all questions with a specific tag

// // Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
