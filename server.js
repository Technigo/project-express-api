import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

// Importing the Netflix JSON data 
import netflixData from "./data/netflix-titles.json";

// Defines the port the app will run on.
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Welcome to the Netflix API! Type in: /endpoints in the address bar to see what endpoints there are. 🍿 🎬 🥤");
});

app.get("/endpoints", (req, res) => {
  res.send(listEndpoints(app))
});

// Route to get all the Netflix data
app.get("/directory", (req, res) => {
  res.status(200).json({
    data: netflixData,
    success: true,
  });
});

// Route for user to type a title and either show it (200 = successful) or not (404 = not found).
app.get("/directory/title/:title", (req, res) => {
  const netflixTitle = netflixData.find((data) => data.title.toLocaleLowerCase() === req.params.title.toLocaleLowerCase());

  if (!netflixTitle) {
    res.status(404).json({
      data: "I'm sorry! I don't have that title. Try something else. Beep-boop. 🤖",
      success: false,
    });
  } else {
    res.status(200).json({
      data: netflixTitle,
      success: true,
    });
  };
});

// Route for user to type an actor/actress name and see what movies/tv shows they are in. (Code not completely finished)
app.get("/directory/cast/:cast", (req, res) => {
  const { cast } = req.params;

  let filteredCastMember = netflixData;

  if (cast) {
    filteredCastMember = filteredCastMember
      .filter((item) => item.cast.toLocaleLowerCase().includes(cast.toLocaleLowerCase()));
  };

  if (!filteredCastMember) {
    res.status(404).json({
      data: "I couldn't find any cast member with that name. 😭 Please try another name!",
      success: false,
    });
  } else {
    res.status(200).json({
      data: filteredCastMember,
      success: true,
    });
  };
});

// Route to get the titles from a specific year.
app.get("/directory/year/:year", (req, res) => {
  const year = req.params.year
  const titlesFromYear = netflixData.filter((data) => data.release_year === +year)
  res.json(titlesFromYear)
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});