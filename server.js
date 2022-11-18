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

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  // console.log("req", req);
  // console.log("res", res);
  // res.send({responseMessage: "Hello Technigo!"});

  res.json({responseMessage: "Hello Technigo!"});
});
// HTMLElement.addEventListener('nameOfTheListener', () => {

// });
app.get("/members", (req, response) => {
  const { name, role } = req.query;
  let members = technigoMembers;

  if (role) {
    members = technigoMembers.filter(singleTechnigoMember => singleTechnigoMember.role.toLowerCase() === role.toLowerCase());
  }
  if (name) {
    members = technigoMembers.filter(singleTechnigoMember => {return singleTechnigoMember.name.toLowerCase() === name.toLowerCase()});
  }
  
  response.status(200).json({technigoMembers: members});
});

app.get("/members/:id", (request, response) => {
  const singleMember = technigoMembers.find((member) => {
    return member.id === Number(request.params.id);
    // return member.id === +request.params.id;
    // return member.id.toString() === request.params.id;
    // return member.id == request.params.id;
  });
  console.log(singleMember);
   response.status(200).json(singleMember);
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
// ctrl + c
// ctrl + `