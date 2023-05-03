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
const listEndpoints = require('express-list-endpoints');

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  // res.send("Hello Technigo!");
  res.json(listEndpoints(app));

});

// get all technigo members
app.get("/members", (request, response) => {
  const { role } = request.query;
  let members = technigoMembers;
  if (role) {
    members = technigoMembers.filter((singleMember) => {
      return singleMember.role.toLowerCase() === role.toLowerCase();
    });
  } 

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
// DRY - don't repeat yourself
// get all technigo members
app.get("/members/:id", (request, response) => {
  const { id } = request.params;
  console.log("id: ", id);
  const singleMember = technigoMembers.find((member) => {
    // return member._id == id;
    return member._id === Number(id);
    // return member._id === id; this doesnt work because id is a numeric value in json but in the param it's always a string
    // return member._id.toString() === id;
    // putting a numerical operator infront of string will force js to evaluate as string
    // return member._id === +id 

  });
  if (singleMember) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        member: singleMember
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

/// endpoint/:pathParam1/:pathParam2?queryParamName=queryParamValue&queryParam5Name=queryParam5Value&queryParam2Name=queryParam2Value