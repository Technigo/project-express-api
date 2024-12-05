import express from "express";
import cors from "cors";
import climbingRoutes from "./data/climbing-routes.json" assert { type: "json" };

const port = process.env.PORT || 9000;
const app = express();

app.use(cors());
app.use(express.json());

// API Documentation
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Climbing Routes API! make a choice below:",
    endpoints: {
      "/climbingRoutes": "Explore all climbing routes",
      "/climbingRoutes/type?type=<type>": "Filter climbing routes by type",
      "/climbingRoutes/:id": "Get a single climbing route by ID",
    },
  });
});

// Return all climbing routes
app.get("/climbingRoutes", (req, res) => {
  res.json(climbingRoutes);
});

// Filter climbing routes by type
app.get("/climbingRoutes/type", (req, res) => {
  const type = req.query.type;
  //console.log(type);

  const filteredRoutes = climbingRoutes.filter(
    (route) => route.type.toLowerCase() === (type || "").toLowerCase()
  );

  res.json(filteredRoutes);
});

// Return a single climbing route by ID
app.get("/climbingRoutes/:id", (req, res) => {
  const id = req.params.id;

  const climbingRoute = climbingRoutes.find((route) => route.id === +id);
  if (climbingRoute) {
    res.json(climbingRoute);
  } else {
    res.status(404).send("No climbing route found with that ID");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
