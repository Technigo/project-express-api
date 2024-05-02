import express from "express";
import cors from "cors";
import netflixData from "./data/netflix-titles.json";
console.log(netflixData.length);

// Defines the port the app will run on.
const port = process.env.PORT || 8080;
const app = express();

// Import a module that helps list all registered endpoints in an Express app.
const listEndPoints = require("express-list-endpoints");

// Enable Cross-Origin Resource Sharing (CORS) for all routes.
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests.

// Start defining your routes here.
// Home route that returns a list of all defined endpoints.
app.get("/", (req, res) => {
  res.send(listEndPoints(app));
});

// Route for paginated listing of Netflix shows.
// Show 25 netflix shows at a time path = /shows?page=1 etc..
app.get("/shows", (req, res) => {
  const itemsCount = netflixData.length; // Get the total number of items in the Netflix data.
  const itemsPerPage = 25; // Define the number of items to display per page.
  const pages = Math.ceil(itemsCount / itemsPerPage); // Calculate the total number of pages needed based on items count and items per page.

  const page = req.query.page || 1; // Retrieve the requested page from the query parameters.
  // Calculate the range of items to be included in the response based on the requested page.
  const from = itemsPerPage * (page - 1);
  let to = page * itemsPerPage;
  to = to < 0 ? 0 : to;

  // Send a JSON response containing the sliced portion of the Netflix data for the requested page.
  res.json({
    shows: netflixData.slice(from, to),
    page,
    pages,
  });
});

// Route for retrieving a single show by its ID.
app.get("/show/:id", (req, res) => {
  // Extract the show ID parameter from the request parameters.
  const id = req.params.id;

  // Use the 'find' method to search for a Netflix show with the specified ID.
  const showId = netflixData.find((item) => item.show_id === +id);

  // Check if a show with the specified ID was not found.
  if (!showId) {
    // Send a 404 response with a message indicating that no show was found with the specified ID.
    res.status(404).send(`No Netflix show found with id: ${id}`);
  } else {
    // If a show with the specified ID was found, send a JSON response with the show's details.
    res.json(showId);
  }
});

// Route for handling various browsing options.
app.get("/browse/:browse", (req, res) => {
  const browse = req.params.browse;
  const type = req.query.type;
  const year = req.query.year;
  const country = req.query.country;

  // Check the value of the "browse" parameter and execute the corresponding logic.
  if (browse === "types") {
    // Filter Netflix shows based on the specified type.
    const filteredShowTypes = netflixData.filter(
      (show) => show.type.toLowerCase() === type
    );
    // Check if any shows match the specified type.
    if (filteredShowTypes.length > 0) {
      res.json(filteredShowTypes);
    } else {
      // If no matches were found, send a 404 response with a message.
      res.status(404).send(`No movies or tv shows found`);
    }
  } else if (browse === "releases") {
    // Filter Netflix shows based on the specified release year.
    const releaseYear = netflixData.filter((y) => y.release_year === +year);
    // Check if any shows match the specified release year.
    if (releaseYear.length > 0) {
      res.json(releaseYear);
    } else {
      // If no matches were found, send a 404 response with a message.
      res.status(404).send(`No releases found year ${year}`);
    }
  } else if (browse === "countries") {
    // Filter Netflix shows based on the specified country.
    const singleCountry = netflixData.filter((c) =>
      c.country.toLowerCase().includes(country)
    );
    // Check if any shows match the specified country.
    if (singleCountry.length > 0) {
      res.json(singleCountry);
    } else {
      // If no matches were found, send a 404 response with a message.
      res.status(404).send(`No Netflix show found in ${country}`);
    }
  } else {
    // If an invalid browse parameter was provided, send a 400 response with a message.
    res
      .status(400)
      .send("Invalid browse parameter. Please specify a valid value.");
  }
});

// DUMMY ENDPOINTS 
// future operations related to user profiles, preferences, or authentication.
app.post("/users", (req, res) => {
  res.status(501).send("Not Implemented");
});

// Placeholder for Watchlist Management.
app.route("/watchlist")
  .get((req, res) => {
    // Implement logic to retrieve user's watchlist (GET operation)
    res.status(501).send("Not Implemented");
  })
  .post((req, res) => {
    // Implement logic to add to user's watchlist (POST operation)
    res.status(501).send("Not Implemented");
  })
  .delete((req, res) => {
    // Implement logic to remove from user's watchlist (DELETE operation)
    res.status(501).send("Not Implemented");
  });

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
