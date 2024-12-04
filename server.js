import express from "express";
import cors from "cors";
import climbingRoutes from "./data/climbingRoutes.json";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

// API Documentation
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Climbing Routes API! make a choice below:",
    customEndpoints: {
      "/climbingRoutes": "Explore all climbing routes",
      "/climbingRoutes/:id": "Get a single climbing route by ID",
    },
  });
});

// Route 1: Return all climbing routes
app.get("/climbingRoutes", (req, res) => {
  res.json(climbingRoutes);
});

// Route 2: Return a single climbing route by ID
app.get("/climbingRoutes/:id", (req, res) => {
  const id = req.params.id;

  const climbingRoute = climbingRoutes.find((route) => route.id === +id);
  if (climbingRoute) {
    res.json(climbingRoute);
  } else {
    res.status(404).send("No climbibg route found with that ID");
  }
});

// Route 3: Filter climbing routes by type
app.get("/climbingRoutes/type", (req, res) => {
  const type = req.query.type;
  console.log(type);

  const filteredRoutes = climbingRoutes.filter(
    (route) => route.type.toLowerCase() === type
  );

  res.json(climbingRoutes);
});

// app.get("/climbingRoutes?type=sport", (req, res) => {
//   const { type } = req.query;
//   if (!type) {
//     return res
//       .status(400)
//       .json({ error: "Please provide a type to filter by" });
//   }
//   const filteredRoutes = climbingRoutes.filter(
//     (route) => route.type.toLowerCase() === type.toLowerCase()
//   );
//   res.json(filteredRoutes);
// });

// // Route 4: Filter climbing routes by difficulty
// app.get("/climbingRoutes/difficulty", (req, res) => {
//   const { difficulty } = req.query;
//   if (!difficulty) {
//     return res
//       .status(400)
//       .json({ error: "Please provide a difficulty to filter by" });
//   }
//   const filteredRoutes = climbingRoutes.filter(
//     (route) => route.difficulty.toLowerCase() === difficulty.toLowerCase()
//   );
//   res.json(filteredRoutes);
// });

// // Route 5: Filter climbing routes by maximum height
// app.get("/climbingRoutes/height", (req, res) => {
//   const maxHeight = parseInt(req.query.maxHeight, 10);
//   if (isNaN(maxHeight)) {
//     return res.json([]); // Return an empty array if maxHeight is invalid
//   }
//   const filteredRoutes = climbingRoutes.filter(
//     (route) => route.height <= maxHeight
//   );
//   res.json(filteredRoutes);
// });

// // Route 6: Paginate climbing routes
// app.get("/climbingRoutes/page", (req, res) => {
//   const { page = 1, pageSize = 3 } = req.query;
//   const startIndex = (page - 1) * pageSize;
//   const endIndex = startIndex + parseInt(pageSize, 10);
//   const paginatedRoutes = climbingRoutes.slice(startIndex, endIndex);
//   res.json({
//     total: climbingRoutes.length,
//     page: parseInt(page, 10),
//     pageSize: parseInt(pageSize, 10),
//     data: paginatedRoutes,
//   });
// });

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
