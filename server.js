import express from "express";
import cors from "cors";
import technigoMembers from "./data/technigo.json";
// If you're using one of our datasets, uncomment the appropriate import below
// to get started! 
// NB3: This in the import nr 2
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
// NB2:express create the hole API boilerplate, express() is a function call, a package.
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
// NB4: cors To be able to have requests from the same origin => both backend and frontend on lcalhost
// express.json() reads the body of the requests as a json
app.use(cors());
app.use(express.json());

// Start defining your routes here
// NB1: What shows in localhost:8080
// NB5: first requests a "get" (adding a functionality), "/" = base path, end point, as in React Router.
// NB7: get request variables (req - request and res - responce) (simularity to Redux stor and action)
app.get("/", (req, res) => {
  // console.log("req", req)
  // console.log("res", res)
  // res.send("Hello Technigo!");
  // res.send({responseMassage: "Hello Technigo!"});
  res.json({responseMassage: "Hello Technigo!"});
  
});

// NB6: Syntax: any html element. nameOfTheListner is the path, ex (event)
// HTMLElement.addEventListner('nameOfTheListner', () => {
// 
// })

// NB new request, new endpoint, members-
// NB Query Params, {}
app.get("/members", (req, res) => {
  const { name, role } = req.query;
  // new response, like the "find" methode below. but with filter
  let members = technigoMembers; // default responce
  if (role) {
    // one liner()
    // members = members.filter(singleTechnigoMember => singleTechnigoMember.role === role)
    // {} use return for statement
    members = members.filter(singleTechnigoMember => { 
      return singleTechnigoMember.role.toLowerCase() === role.toLowerCase()});
  }
  if (name) {
    members = members.filter(singleTechnigoMember => { 
      return singleTechnigoMember.name.toLowerCase() === name.toLowerCase()});
  }

  // res.status(200).json({technigoMembers: members});
  res.status(200).json({
    success: true,
    //Error massage
    message: "OK",
    body: {
      technigoMembers: members
    }
  });
});

// NB params uniqe id /:id => ex 1,2,3
app.get("/members/:id", (req, res) => {
  const singleMember = technigoMembers.find((member) => {
    return member.id === +req.params.id;
    // return member.id === Number(req.params.id);
    // return member.id.toString() === req.params.id;
    // return member.id == req.params.id;
  });
  if(singleMember) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        members: singleMember
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Not Found",
      body: {}
    })
  }
  console.log(singleMember);
  
});

// NBStart the server, port = (const port = process.env.PORT || 8080;) längst upp.
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
