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
      "/elves/top-twelves": "Get the top twelves",
      "/elves/titles/:title": "Get elves by title",
      "/elves/:id": "Get a specific elf by ID",
      "/test": "Test endpoint",
    endpoints: endpoints
    }
  });
});

/**
 * Endpoint for getting all elves.
 * This endpoint returns the complete list of elves from the elves.json.
 */

app.get("/elves/all", (request, response) => {
  
  // Return all elves
  response.json(elves);
});

/**
 * Endpoint to get the top 12 elves, the "TwElves"
 * This endpoint uses .slice() to return the first 12 elves from the elves.json.
 */
app.get("/elves/top-twelves", (request, response) => {
  const topElves = elves.slice(0, 12);

  // Return top 12 elves
  response.json(topElves);
});

/**
 * Endpoint for getting elves based on the provided title. 
 * This endpoint uses .filter() to return the elves with a matching title
 */
app.get("/elves/titles/:title", (request, response) => {
  const title = request.params.title.toLowerCase();
  const filteredElves = elves.filter((event) => event.title.toLowerCase() === title);

  // Return elves with titles that match
  response.json(filteredElves);
});

//Get a unique elf by ID
/**
 * Endpoint for getting elves based on a unique ID. 
 * This endpoint uses .find() to search for the elf in the elves.json. 
 * If an elf with the given ID exists, it returns the elf's data with a 200 status.
 * If no elf is found, it returns with a 404 status and the message: "404 - No elf found with that ID".
 */

app.get("/elves/:id", (request, response) => {
  const id = request.params.id;

  const elf = elves.find((event) => event.elfID === +id);
  if (elf) {
    response.status(200).json(elf);
  } else {
    response.status(404).send("404 - No elf found with that ID");
  }
})

/**
 * Endpoint for testing the server.
 * This endpoint confirms that the server is running and responds with "Jingle bells, the server tells, it's up and running well!"
 */
app.get("/test", (request, response) => {
  response.send("Jingle bells, the server tells, it's up and running well!");
  console.log("Jingle bells, the server tells, it's up and running well!");
});

/**
 * Start the server.
 * The server listens on the specified port and logs the URL to the console.
 */
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
