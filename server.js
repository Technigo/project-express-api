// /////////////////// IMPORTS //////////////////////////////// //

// The first two lines import the express and cors packages, 
// which are used to create the server and enable Cross-Origin Resource Sharing (CORS). 
// The third line imports a JSON file containing data about avocado sales.

import express from "express";
import cors from "cors";
import topMusicData from "./data/top-music.json";

// ///////////////// APP //////////////////////////////// //

// The first line sets the server port number to either the PORT environment variable or 8080 if PORT is not defined.

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing

app.use(cors());
app.use(express.json());

// This code defines a basic route at the root URL ("/") that responds with the text "Hello Technigo!" 
// when accessed with an HTTP GET request.

app.get("/", (req, res) => {
  res.send(
    "Welcome to this top-music API!"
  );
});

// get all technigo members
app.get("/music", (req, response) => {
  const music = topMusicData;
  if (music) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        topMusicData: music
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

// get all technigo members
app.get("/music/:id", (req, response) => {
  const { id } = request.params;
  const singleTrack = topMusicData.find((track) => {
    return track.id === Number(id);
  })
  if (singleTrack) {

    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        track: singleTrack
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

// Start the server
// Finally, this code starts the server and listens for incoming requests on the specified port. 
// When the server is running, it logs a message to the console.

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
