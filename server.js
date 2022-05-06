import express from "express";
import cors from "cors";
import getEndpoints from "express-list-endpoints";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
 import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";
//import members from "./data/technigo-members.json";
import { findConfigUpwards } from "@babel/core/lib/config/files";
// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());// decides what origins to accept. Corse() means all origins are accepted
app.use(express.json()); //unpacks info from requests

// Start defining your routes here
app.get("/", (req, res) => {
  res.send(getEndpoints(app));
});


app.get("/titles", (req, res)=>//second argument is callback, request (info that comes) and response(what we send back).
{ 
const {year, country, type}= req.query
let allTitles= netflixData 
if(country){
  allTitles= allTitles.filter(title=>title.country.toLowerCase()===country.toLocaleLowerCase()
  )
}
if (year){
 allTitles=allTitles.filter(title=>title.release_year===+year)
} 
if(type==="TV Show"){allTitles=allTitles.filter(title=>title.type===type)}

if(type==="Movie"){allTitles=allTitles.filter(title=>title.type===type)}

res.status(202).json({
  data:allTitles,
  success:true,
}) 
}) 

app.get("/titles/title/:name",(req, res)=>{
const {name}= req.params//destruction

const titleByName=netflixData.find((title)=>title.title.toLowerCase()===name.toLocaleLowerCase())

if(!titleByName){
  res.status(404).json({
  data:"Not found",
  sucess:false,
})
}
else{
  res.status(200).json({
  data:titleByName,
  sucess:true,
})
}
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
