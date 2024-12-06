const express = require("express");  // Web application framework
const cors = require("cors");        // CORS is needed to allow requests from different domains
const listEndpoints = require('express-list-endpoints');  // Used to generate API documentation
const dogs = require("./data/dog-breeds.json");  // Import our dogs data from JSON file

// Sets up server port - uses environment variable if available, otherwise use 8080
const port = process.env.PORT || 8080;
// Initialize express application
const app = express();

// Middleware setup
app.use(cors());           // Enable CORS for all routes
app.use(express.json());   // Parse incoming JSON requests

// Route for getting a single dog by ID
app.get("/dogs/:id", (req, res) => {
  const id = req.params.id;  // Get the ID from the URL parameter
  console.log("Requested ID:", id, "Type:", typeof id);
  
  // Finds the dog with matching ID (converts string ID to number for comparison)
  const dog = dogs.find(dog => {
    return dog.id === parseInt(id);
  });
  
  // If no dog is found with that ID, return 404 error
  if (!dog) {
    res.status(404).json({ error: "Dog breed not found" });
  } else {
    res.json(dog);  // Return the found dog
  }
});

// Route for getting all dogs, with optional category filter
app.get("/dogs", (req, res) => {
  const category = req.query.category;  // Get category from query parameter if exists
  // If category parameter exists, filter dogs by category, otherwise return all dogs
  const filteredDogs = category 
    ? dogs.filter(dog => dog.category === category)
    : dogs;
  res.json(filteredDogs);
});

// Root route - returns API documentation
app.get("/", (req, res) => {
  const endpoints = listEndpoints(app);  // Generate list of all available endpoints
  res.json({
    description: "Dog Breeds API - Access information about different dog breeds",
    endpoints: endpoints  // Shows all available API endpoints
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});