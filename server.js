// /////////////////// IMPORTS //////////////////////////////// //

// The first two lines import the express and cors packages, 
// which are used to create the server and enable Cross-Origin Resource Sharing (CORS). 
// The third line imports a JSON file containing data about avocado sales.

import express from "express";
import cors from "cors";
import andreasClouds from "./data/andreasClouds.json";

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
  res.send({
    Hello: "Welcome Andreas Cloud API!",
    Routes: [
      { "/": "Startpage / Api Info" },
      { "/allclouds": "All clouds listed" },
      { "/allclouds/:id": "Singel cloud" }, 
      { "/allclouds/dreamyness/:dreamynessover": "Sorts the clouds after the minimun dreamyness. From minimum and up." },
      { "/allclouds/technigoapproved/:trueorfalse": "Sorts the clouds. Technigoapproved or not." }
    ]
});
}); 

// get all music
app.get("/allclouds", (req, response) => {
  const clouds = andreasClouds;
  if (clouds) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        andreasClouds: clouds
      }
    });
  } else {
    response.status(404).json({
      success: false,
      message: "Page not found",
      body: {}
    });
  }
});

// get single tracks
app.get("/allclouds/:id", (req, response) => {
  const { id } = req.params;
  const singleCloud = andreasClouds.find((fluff) => {
    return fluff.id === Number(id);
  })
  if ((singleCloud.length !== 0)) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        fluff: singleCloud
      }
    });
  } else {
    response.status(404).json({
      success: false,
      message: "Id not found",
      body: {}
    });
  }
});

// sorted by dreamyness rating
app.get("/allclouds/dreamyness/:dreamynessover", (req, response) => {
  const { dreamynessover } = req.params;
  const singleCloud = andreasClouds.filter((fluff) => {
    return fluff.dreamyness >= Number(dreamynessover);
  })
  const sortedFluff = singleCloud.sort((a, b) => a.dreamyness - b.dreamyness);
  if (sortedFluff.length !== 0) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        fluff: sortedFluff
      }
    });
  } else {
    response.status(404).json({
      success: false,
      message: "Dreamyness score not found",
      body: {}
    });
  }
});

// sorted by technigoapproved or not.
app.get("/allclouds/technigoapproved/:trueorfalse", (req, response) => {
  const { trueorfalse } = req.params;
  const singleCloud = andreasClouds.filter((fluff) => {
    return fluff.technigoapproved === (trueorfalse === 'true');
  })
  const sortedFluff = singleCloud.sort((a, b) => a.technigoapproved - b.technigoapproved);
  if (sortedFluff.length !== 0) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        fluff: sortedFluff
      }
    });
  } else {
    response.status(404).json({
      success: false,
      message: "Approval not found",
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
