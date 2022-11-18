/* import express from "express"; // låter oss skapa hela appen nedan 
import cors from "cors"; //cross origin resource sharing - allows request from same localhost? 
// annars blockeras det, det visar att alt är säkert
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
const app = express(); //function 

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json()); // läser the bodys response som JSON och man behöveer inte stingify osv

// Start defining your routes here
app.get("/", (req, res) => {
 /*  console.log("req", req)
  console.log("res", res) */
  /* res.send({responseMessage: "Hello Technigo!"});  //string - gör man inte i vanliga fall utan det är något som finns i JSON 
  //({responseMessage: "Hello Technigo"}); (ser mer ut som man är van när man kollar i consolen)
  // send = processerar något som en json? 
  // json = expects a json object och skickas accordingly, är något fel så säger den till. 
  // Lite mer säker att använda därför, man ser det i the parsing of the json. läs mer på StackOverflow
  res.json({responseMessage: "Hello Technigo!"});
});

app.get("/members", (req, res) => {
   res.status(200).json({technigoMembers: technigoMembers});
 });

 app.get("/members/:id", (req, res) => {
   const singleMember = technigoMembers.find((member) => {
     return member.id === +req.params.id;
   });
  res.status(200).json(singleMember);
});
// + för att det inte är ett nummer originally (request params är alltid tollkat som en string)

 // 404 = status code
 // 200 skickas per default - säger att något är gjort och att det är gjort correct 
//Objects:
//params {}
// query{}
// "/" linkande som react router och syntax är likadant. Req = request och res=respons 

// Såhär såg det ut i javascript (get här ovan fungerar likadant?)
/* HTMLElement.addEventListener('nameOfTheListener', () => {

});
 
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
 */