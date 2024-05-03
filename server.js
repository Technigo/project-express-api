import express from "express";
import cors from "cors";

// Import the data
import cartooncharsData from "./data/cartoonchars.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
// Root route ("/") to greet users
app.get("/", (req, res) => {
  res.send(
    "Welcome to the Cartoon Character API! 🎉 Explore your favorite cartoon characters by accessing the '/cartoonchars' endpoint."
  );
});

// Get all the cartoon characters
// The "/cartoonchars" route to return a collection of cartoon characters
// http://localhost:8080/cartoonchars
app.get("/cartoonchars", (req, res) => {
  res.json(cartooncharsData);
});

// Get one cartoon character based on id
// The "/cartoonchars/:cartooncharID" route to return a single cartoon character (add number)
// http://localhost:8080/cartoonchars/12 (random number)
app.get("/cartoonchars/:cartooncharID", (req, res) => {
  const { cartooncharID } = req.params;

  const cartoonchar = cartooncharsData.find(
    (cartoonchar) => +cartooncharID === cartoonchar.id
  );

  console.log(cartooncharID);

  if (cartoonchar) {
    res.json(cartoonchar);
  } else {
    res.status(404).send("no cartoon character found");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
