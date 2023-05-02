import express from "express";
import cors from "cors";
import technigoMembers from "./data/technigo-members.json";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

// get member
app.get("/members", (request, response) => {
  const members = false;
  if (members) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        technigoMembers: members
      }
    });
  } else {
    response.status(500).json({
      success: false,
      message: "Something went wrong",
      body: {}
    });
  }
});

// get single member
app.get("/members/:id", (request, response) => {
  const singleMembers = technigoMembers.find((member) => {
    const { id } = request.params
    return member._id === Number(id);
  });
  if (members) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        technigoMembers: members
      }
    });
  } else {
    response.status(404).json({
      success: false,
      message: "Member not found",
      body: {}
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
