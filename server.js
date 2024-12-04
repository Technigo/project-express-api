import express from "express";
import cors from "cors";
import cats from "./data/cats.json"

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 9000;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (request, response) => {
  response.send("Miao miao!");
});

// Combined cats route with category query filter for name
app.get("/cats", (request, response) => {
  const name = request.query.name;
  
  if (name) {
    const filteredCats = cats.filter(
      cats => cats.name.toLowerCase() === name.toLowerCase()
    );
    response.json(filteredCats);
  } else {
    response.json(cats);
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});






