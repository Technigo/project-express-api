import express from "express";
import cors from "cors";

// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";
import boardGameData from "./data/boardGameData.json";

/* 
This part of the code is setting up a variable port that will be used to specify the port on which the server will listen. It uses the process.env.PORT environment variable, which is a way to allow configuration from the outside. If process.env.PORT is not defined (i.e., it's falsy, which includes being undefined), it defaults to using port 8080.

If I want to run the server on a different port, I can override the value by setting the PORT environment variable when starting the server like this:
PORT=9000 npm start
*/

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable Cross-Origin Resource Sharing (CORS) 
// and parse incoming JSON requests.
app.use(cors());
app.use(express.json());

// Define a route for the root path ('/') to display a welcome message.
/* This route is handling HTTP GET requests to the root path ('/'). When a user accesses the main URL of your application (e.g., http://localhost:8080/), this route will respond with the message "Welcome to the Top 100 Board Games API!". */
app.get("/", (req, res) => {
  res.send("Welcome to the Top 100 Board Games API!");
});

// Define a route to get all board games.
app.get("/games", (req, res) => {

  // Filter by year:

  // Extract the 'year' query parameter from the request object.
  const { year } = req.query;

  // Check if the 'year' parameter is provided in the request.
  if (year) {
    // If 'year' is provided, filter the 'boardGameData' array.
    // /games?year=2017, for example.
    // Use the filter method to create a new array ('filteredGamesYear') containing
    // only the games whose 'Year' property matches the provided 'year' value.
    // The plus operator (+) is used to convert the 'year' to a number.
    // This ensures strict equality when comparing with the 'Year' property of each game.
    const filteredGamesYear = boardGameData.filter((game) => game.Year === +year);

    // Respond with the JSON array containing the games filtered by the provided year.
    res.json(filteredGamesYear);
  }

  // Filter by type of game:
  // /games?gametype=strategy 

  const { gametype } = req.query;

  if (gametype) {
    const filteredGamesType = boardGameData.filter((game) => game.Type.toLowerCase() === gametype.toLowerCase());

    res.json(filteredGamesType);
  }

  // Sort by rating:
  // Extract the 'sortBy' query parameter from the request object.
  const { sortBy } = req.query;

  // Check if the 'sortBy' parameter is provided in the request.
  if (sortBy === "rating") {
    // If 'sortBy' is provided and set to 'rating', sort the 'boardGameData' array.
    // /games?sortBy=rating, for example.
    // Use the sort method to create a new array ('sortedGames') containing
    // games sorted in descending order based on their 'Rating' property.

    // The sort function compares the 'Rating' property of game 'a' with that of game 'b'.  If b.Rating is greater than a.Rating, it will be moved to a lower index, resulting in a descending order. When performing comparisons or mathematical operations with numeric values, JavaScript automatically treats the values as numbers. No need for the plus operator (+)
    // The result is a new array ('sortedGames') with games sorted by descending rating.
    const sortedGames = boardGameData.sort((a, b) => b.Rating - a.Rating);

    // Respond with the JSON array containing the games sorted by rating.
    res.json(sortedGames);
  }


  // Search by name:
  // Extract the 'name' query parameter from the req.query object.
  const { name } = req.query;

  // Check if the 'name' parameter is provided in the request. If the name parameter exists in the query parameters, the code inside the if statement will be executed.

  if (name) {
    // If 'name' is provided, filter the 'boardGameData' array.
    // /games?name=Gloomhaven
    // Use the filter() method to create a new array ('matchingGames') containing
    // only the games whose 'Name' property includes the provided 'name' value.
    // The callback function inside filter checks if the lowercase version of the Name property of each game includes the provided name (also converted to lowercase). This way, it performs a case-insensitive partial match.
    // For example, without case-insensitivity, a search for "Gloomhaven" might not match a game named "gloomHaven" or "GLOOMHAVEN."
    const matchingGames = boardGameData.filter((game) =>
      game.Name.toLowerCase().includes(name.toLowerCase())
    );

    // Respond with the JSON array containing the matching games.
    return res.json(matchingGames);
  }


  // Implement pagination:
  /* 
  const { page = 1, pageSize = 10 } = req.query;: 
  Destructure page and pageSize from the query parameters. Default to page 1 and pageSize 10 if not provided.
  */
  const { page = 1, pageSize = 20 } = req.query;

  /* pageSize === "all": checks if the pageSize parameter is explicitly set to the string "all." If true, it means the client wants to retrieve all games.

  parseInt(pageSize) > boardGameData.length:
  If the client specifies a pageSize that, when parsed as an integer, is greater than the total number of games (boardGameData.length), then parseInt(pageSize) > boardGameData.length evaluates to true. 
  For example:
  If pageSize is set to "150" and you have 100 games, parseInt("150") results in 150, and 150 > 100 is true.
  This is flexible and give the option to show all games regardless of the actual count.
  If either of these conditions is true, isAllGamesRequested will be true. 
  Examples: 
    /games?page=1&pageSize=all
    /games?page=1 (defaults to pageSize = 10, the first 10 games)
    /games (also defaults to pageSize = 10, the first 10 games)
    /games?page=2&pageSize=5 get the second page with 5 games per page.
  */
  const isAllGamesRequested = pageSize === "all" || pageSize > boardGameData.length;

  /* The starting index of the paginated games based on the requested page and pageSize.
  (page - 1) * parseInt(pageSize): This expression multiplies the adjusted page number (zero-based indexing) by the parsed page size. The result represents the starting index of the range of games that should be included in the response for the requested page. 
  For example:
  /games?page=1&pageSize=10  // The start index is 0
  */
  const start = (page - 1) * pageSize;
  /* The ending index of the paginated games. If all games are requested, set to the total number of games; otherwise, calculate based on the start index and pageSize. The range is inclusive of the start index but exclusive of the end index. For example:
  /games?page=2&pageSize=20 // The end would be 40
  */
  const end = isAllGamesRequested ? boardGameData.length : start + parseInt(pageSize);

  /* Extract the paginated games using the slice method.
  The slice method is used to extract a portion of the array. It takes two parameters: the start index and the end index (exclusive). If the start is 20 and the end is 40 it woukld be a range between 20 and 39
  */
  const paginatedGames = boardGameData.slice(start, end);

  /* Respond with paginated games.
    If the user hasn't specified any specific pages, sorting options, or filtering criteria, this line ensures that the server responds with the default set of paginated games. In this implementation, the default paginated range is determined by the default values of page and pageSize, which are 1 and 10, respectively.
  */

  res.json(paginatedGames);



});

// Define a route to get a specific board game based on its rank.
app.get("/games/:rank", (req, res) => {
  // Extract the game rank from the URL parameter.
  // req.params.rank retrieves the value of the :rank parameter from the URL.
  const gameRank = parseInt(req.params.rank);

  // Find the board game in the data with the matching rank.
  // item.Rank === gameRank can be written like: item.Rank === +gameRank instead of parseInt above
  const game = boardGameData.find((item) => item.Rank === gameRank);

  // If the game is not found, respond with a 404 error.
  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }

  // Respond with the JSON data of the specific board game.
  res.json(game);
});

// Start the server and listen on the specified port.
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
