import express from "express";
import cors from "cors";
import videoGameData from "./data/video-games.json";

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
  res.send("Home page");
});

// This function covers the most common 4xx error codes

const messages = {
  400: "400 Bad Request: The request by the client was not processed, as the server could not understand what the client is asking for.",
  401: "401 Unauthorized: The client is not allowed to access resources, and should re-request with the required credentials.",
  403: "403 Forbidden: The request is valid and the client is authenticated, but the client is not allowed access the page or resource for any reason. E.g sometimes the authorized client is not allowed to access the directory on the server.",
  404: "404 Not Found: The requested resource is not available now.",
  410: "410 Gone: The requested resource is no longer available which has been intentionally moved."
};

app.all("*", (req, res) => {
  const statusCode = parseInt(res.statusCode);
  // The statusCode property is a numeric HTTP status code that indicates the result of the HTTP request.
  // The parseInt() function is a built-in JavaScript function that parses a string and returns an integer.
  // In this case, it is used to ensure that the statusCode property is an integer, since it is possible that it could be a string.
  const message = messages[statusCode] || "Unknown Error";
  // By converting the statusCode property to an integer, we can use it as a key to retrieve the corresponding message from the messages object.
  res.send(message);
});

// This function gets all the video game data received from the JSON 
app.get("/videogames", (req, res) => {
  const data = videoGameData
  if (data) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        videoGameData: data
      }
    })
  } else {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      body: {}
    })
  }
  
})

// Rating endpoint
app.get("/videogames/ratedAs/:rating", (req, res) => {
  const rating = req.params.rating
  console.log({ rating })
  const filteredByRating = videoGameData.filter((item) => item.Rating === +rating)
  res.json(filteredByRating)
})

// Video game endpoint
app.get("/videogames/:videogameId", (req, res) => {
  const id = req.params.videogameId
  console.log({ id })
  const filteredById = videoGameData.filter((item) => item.Id === +id)
  res.json(filteredById)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
