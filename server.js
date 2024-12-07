import express from "express";
import expressListEndpoints from "express-list-endpoints";
import cors from "cors";

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Import book routes & create the route
import bookRoutes from "./routes/bookRoutes.js";
app.use("/api/books", bookRoutes);

const endpoints = expressListEndpoints(app);

// Root route with documenation
app.get("/", (req, res) => {
  res.send(endpoints);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
