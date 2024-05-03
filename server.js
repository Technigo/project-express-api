import express from "express";
import cors from "cors";
import cartooncharsData from "./data/cartoonchars.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
// Root route ("/") to greet users
app.get("/", (req, res) => {
  res.send(
    "Welcome to the Cartoon Character API! 🎉 Explore your favorite cartoon characters by accessing the '/cartoonchars' endpoint."
  );
});

// Get all the cartoon characters with optional filtering by show
// Add /cartoonchars?show=The Powerpuff Girls (The Powerpuff Girls for example)
app.get("/cartoonchars", (req, res) => {
  const { show } = req.query;

  let filteredCartoonChars = cartooncharsData;

  if (show) {
    // Filter the data by show
    filteredCartoonChars = filteredCartoonChars.filter(
      (cartoonchar) => cartoonchar.show.toLowerCase() === show.toLowerCase()
    );

    // If no characters match the provided show, return a 404 error
    if (filteredCartoonChars.length === 0) {
      return res
        .status(404)
        .json({ error: `Cartoon characters from show "${show}" not found.` });
    }
  }

  res.json(filteredCartoonChars);
});

// Get cartoon character based on id
// The "/cartoonchars/:cartooncharID" route to return a single cartoon character (add number)
// Add /cartoonchars/12 (random number 12 added)
app.get("/cartoonchars/:cartooncharID", (req, res) => {
  const { cartooncharID } = req.params;

  const cartoonchar = cartooncharsData.find(
    (cartoonchar) => +cartooncharID === cartoonchar.id
  );

  // If the cartoon character is found, send it in the response
  // Otherwise, send a 404 error response
  if (cartoonchar) {
    res.json(cartoonchar);
  } else {
    res.status(404).json({
      error: `Cartoon character with ID ${cartooncharID} not found. Please make sure you provided a valid ID between 1 and ${cartooncharsData.length}.`,
      id: cartooncharID,
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
