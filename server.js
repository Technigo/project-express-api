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
// To list all endpoints in the app
const listEndpoints = require("express-list-endpoints");

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  // console.log("req", req);
  // console.log("res", res);
  // res.send(app.routes);
  // List all endpoint on first page
  res.json(listEndpoints(app));
});
// Members endpoint
app.get("/members", (req, res) => {
  // queary parameters: we will deploy a new response
  const { name, role } = req.query;
  let members = technigoMembers;
  // filter method to deploy more results with same role or name
  if (role) {
    members = members.filter((singleTechnigoMember) => {
      return singleTechnigoMember.role.toLowerCase() === role.toLowerCase();
    });
  }
  if (name) {
    members = members.filter((singleTechnigoMember) => {
      return singleTechnigoMember.name.toLowerCase() === name.toLowerCase();
    });
  }
  res.status(200).json({
    success: true,
    message: "OK",
    body: {
      technigoMembers: members,
    },
  });
});

// Members/ID endpoint
app.get("/members/:id", (request, response) => {
  // find method will return the first object that fits descrition
  const singleMember = technigoMembers.find((member) => {
    return member.id === Number(request.params.id);
    // return member.id === +request.params.id;
    // return member.id.toString() === request.params.id;
    // return member.id === request.params.id;
  });
  if (singleMember) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        member: singleMember,
      },
    });
  } else {
    response.status(404).json({
      success: false,
      message: "Not Found",
      body: {},
    });
  }
  console.log(singleMember);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// baseURL = http://localhost:8080
// baseURL?firstQuearyParam=FirstQuearyParamValue&secondQuearyParam=SecondQuearyParamValue&...&thQuearyParam=nthQuearyParamValue
// baseUrl/pathParamValue?firstQuearyParam=FirstQuearyParamValue&secondQuearyParam=SecondQuearyParamValue&...&thQuearyParam=nthQuearyParamValue
