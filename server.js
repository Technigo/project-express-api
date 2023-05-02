import express from "express";
import cors from "cors";
import technigoMembers from "./data/technigo-members.json"

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

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here ("req" = request, "res" = response)
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

// Get all Technigo members:
app.get("/members", (req, res) => {
  const { role } = req.query;
  let members = technigoMembers;

  if (role) {
    members = technigoMembers.filter((singleMember) => {
      return singleMember.role.toLowerCase() === role.toLowerCase();
    });
  } 

  if (members) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        technigoMembers: members
      }
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      body: {}
    });
  }
});

// :,(
// Get one specific technigo member:
app.get("/members/:id", (request, response) => {
  const { id } = request.params;
  console.log("id: ", id);
  const singleMember = technigoMembers.find((member) => {
    // return member._id == id;
    return member._id === Number(id);
    // return member._id.toString() === id;
    // return member._id === +id; 
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
