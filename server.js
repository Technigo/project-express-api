import express from "express";
import cors from "cors";

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
app.get("/members/name/:name", (req, res) => {
  const { name } = req.params;

  const memberByName = members.find((member) => member.name === name);

  if (!memberByName) {
    res.status(404).json({
      data: "Not found",
      sucess: false,
    });
  } else {
    res.status(200).json({
      data: memberByName,
      sucess: true,
    });

  }
});

app.get("/members/role/:role", (req, res) => {
  const { role } = req.params;

  const membersByRole = members.filter(
    (member) => member.role.toLowerCase() === role.toLowerCase()
  );

  res.status(200).json({
    data: membersByRole,
    success: true,
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
