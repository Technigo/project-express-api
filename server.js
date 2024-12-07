import express from "express";
import cors from "cors";
import expressListEndpoints from 'express-list-endpoints';
import elves from "./data/elves.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden when starting the server. Example command to overwrite PORT env variable value: PORT=1224 npm start
const port = process.env.PORT || 1224; // Hoho
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Documentation endpoint
app.get("/", (request, response) => {
  const endpoints = expressListEndpoints(app);
  response.json({
    message: "Welcome to the Elves API! Here are the available endpoints:",
    description: {
      "/elves/all": "Get all elves",
      "/elves/titles": "Get all unique elf titles",
      "/elves/titles/:title": "Get elves by title",
      "/elves/:id": "Get a specific elf by ID",
      "/test": "Test endpoint",
      endpoints: endpoints
    }
  });
});

// Endpoint to get all elves using a path parameter
app.get("/elves/all", (request, response) => {
  
  // Return all elves
  response.json(elves);
});

// Endpoint to get all unique titles of elves
app.get("/elves/titles", (request, response) => {
  // Extract titles and remove duplicates
  const uniqueTitles = [];
  elves.forEach((event) => {
    if (!uniqueTitles.includes(event.title)) {
      uniqueTitles.push(event.title);
    }
  });

  // Return the unique titles
  response.json(uniqueTitles);
});

// Path parameter for getting elves based on the provided title
// If 'title' exists, return elves with titles that match, otherwise, return all elves

app.get("/elves/titles/:title", (request, response) => {
  const title = request.params.title.toLowerCase();
  const filteredElves = elves.filter((event) => event.title.toLowerCase() === title);

  // Return elves with titles that match
  response.json(filteredElves);
});

//Get a unique elf by ID

app.get("/elves/:id", (request, response) => {
  const id = request.params.id;

  const elf = elves.find((event) => event.elfID === +id);
  if (elf) {
    response.status(200).json(elf);
  } else {
    response.status(404).send("No elf found with that ID");
  }
})

// Test endpoint
app.get("/test", (request, response) => {
  response.send("Testing testing!");
  console.log("Testing testing");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
