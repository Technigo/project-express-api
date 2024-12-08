import express from "express";
import cors from "cors";
import climbingRoutes from "./data/climbing-routes.json" assert { type: "json" };
import listEndpoints from "express-list-endpoints";

const port = process.env.PORT || 9000;
const app = express();

app.use(cors());
app.use(express.json());

// API Documentation with express-list-endpoints
app.get("/", (_, res) => {
  res.json({
    message:
      "Welcome to the Climbing Routes API! Here are the available endpoints:",
    endpoints: listEndpoints(app),
  });
});

// Return all climbing routes
// http://localhost:9000/climbingRoutes
app.get("/climbingRoutes", (_, res) => {
  res.json(climbingRoutes);
});

// Filter climbing routes by type
// http://localhost:9000/climbingRoutes/type?type=<i.e. sport, bouldering>
app.get("/climbingRoutes/type", (req, res) => {
  const type = req.query.type;

  // Check if 'type' is provided
  if (!type) {
    return res.status(400).send("The 'type' query parameter is required.");
  }

  // Filter climbing routes by the provided type
  const filteredRoutes = climbingRoutes.filter(
    (route) => route.type.toLowerCase() === type.toLowerCase()
  );

  // If no routes match the type, return a 404 error
  if (filteredRoutes.length === 0) {
    return res.status(404).send(`No climbing routes found for type '${type}'.`);
  }

  // Return the filtered routes
  res.json(filteredRoutes);
});

// Filter climbing routes by difficulty
// http://localhost:9000/climbingRoutes/difficulty?difficulty=<i.e. low, average, high>
app.get("/climbingRoutes/difficulty", (req, res) => {
  const difficulty = req.query.difficulty;

  // Check if 'difficulty' is provided
  if (!difficulty) {
    return res
      .status(400)
      .send("The 'difficulty' query parameter is required.");
  }

  // Filter climbing routes by the provided difficulty
  const filteredRoutes = climbingRoutes.filter(
    (route) => route.difficulty.toLowerCase() === difficulty.toLowerCase()
  );

  // If no routes match the type, return a 404 error
  if (filteredRoutes.length === 0) {
    return res
      .status(404)
      .send(`No climbing routes found for type '${difficulty}'.`);
  }

  // Return the filtered routes
  res.json(filteredRoutes);
});

// Filter climbing routes by height
// Example: http://localhost:9000/climbingRoutes/height?height=<i.e. number>
app.get("/climbingRoutes/height", (req, res) => {
  const height = Number(req.query.height); // Convert query parameter to a number

  // Check if 'height' is a valid number
  if (isNaN(height)) {
    return res
      .status(400)
      .send("The 'height' query parameter must be a valid number.");
  }

  // Filter climbing routes by the provided height
  const filteredRoutes = climbingRoutes.filter(
    (route) => route.height === height
  );

  // If no routes match the height, return a 404 error
  if (filteredRoutes.length === 0) {
    return res
      .status(404)
      .send(`No climbing routes found with height '${height}'.`);
  }

  // Return the filtered routes
  res.json(filteredRoutes);
});

// Dummy endpoint for getting climbing route statistics
// http://localhost:9000/climbingRoutes/stats
app.get("/climbingRoutes/stats", (_, res) => {
  res
    .status(501)
    .send(
      "This endpoint will provide climbing route statistics in the future."
    );
});

// Return a single climbing route by ID
// http://localhost:9000/climbingRoutes/:d (1-8)
app.get("/climbingRoutes/:id", (req, res) => {
  const id = req.params.id;

  const climbingRoute = climbingRoutes.find((route) => route.id === +id);
  if (climbingRoute) {
    res.json(climbingRoute);
  } else {
    res.status(404).send("No climbing route found with that ID");
  }
});

// Dummy endpoint for adding a new climbing route
// http://localhost:9000/climbingRoutes
app.post("/climbingRoutes", (_, res) => {
  res
    .status(501)
    .send("This endpoint will allow adding new climbing routes in the future.");
});

// Dummy endpoint for updating an existing climbing route
// http://localhost:9000/climbingRoutes/:id
app.put("/climbingRoutes/:id", (_, res) => {
  res
    .status(501)
    .send("This endpoint will allow updating climbing routes in the future.");
});

// Dummy endpoint for deleting a climbing route
// http://localhost:9000/climbingRoutes/:id
app.delete("/climbingRoutes/:id", (_, res) => {
  res
    .status(501)
    .send("This endpoint will allow deleting climbing routes in the future.");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// NOTE: Static routes (e.g., /stats) must be defined BEFORE dynamic routes (e.g., /:id)
// Express matches routes in the order they are defined, and dynamic routes like /:id
// can unintentionally catch requests meant for static routes. For example:
// If /climbingRoutes/:id comes before /climbingRoutes/stats, a request to /stats
// will be treated as if 'stats' is an ID. To avoid this, always define static routes first.
