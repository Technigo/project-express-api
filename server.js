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
    endpoints: endpoints
  });
});

// Test endpoint
app.get("/test", (request, response) => {
  response.send("Testing testing!");
  console.log("Testing testing");
});

// Endpoint to get all elves, with optional query filter
app.get("/elves", (request, response) => {
  const title = request.query.title?.toLowerCase(); // 
  console.log(title);

  const filteredElves = elves.filter((event) => event.title.toLocaleLowerCase() === title); 

  response.json(filteredElves);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
