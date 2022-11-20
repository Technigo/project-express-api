import express from "express";
import cors from "cors";
import netflixData from "./data/netflix-titles.json";

// PORT=9000 npm start
const port = process.env.PORT || 9000;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
// cors method Let us to read body from the res as json. We do not need to do Pars or Stringify()
app.use(express.json());
// .get add functinality to the app
// Start defining your routes here
app.get("/", (req, res) => {
 
  res.send("With this API you can access to the netflix movie detalis!");

});

app.post ('/', (req, res) => {
  res.status(200).json({
    success: true,
    msg:req.body.msg
  })
})

// Resp to have all data
app.get('/allMovies', (req, res) => {
  // res.json(netflixData)
  res.status(200).json(netflixData)
})

app.get('/allMovies', (req, res) => {   
  const {country, duration, type, cast} = req.query   

let filteredNetflixData = netflixData        

if(country){ 
  filteredNetflixData = filteredNetflixData.filter((item) => item.country.toLocaleLowerCase().includes(country.toLocaleLowerCase()))   
}    
if(duration){     
  filteredNetflixData = filteredNetflixData.filter((item) => item.duration.toLocaleLowerCase().includes(duration.toLocaleLowerCase()))   
}   
if(type){
  filteredNetflixData = filteredNetflixData.filter((item) => item.type.toLocaleLowerCase().includes(type.toLocaleLowerCase()))
}  
if(cast){
  filteredNetflixData = filteredNetflixData.filter((item) => item.cast.toLocaleLowerCase().includes(cast.toLocaleLowerCase()))
} 

if(filteredNetflixData.length === 0){ 
  response.status(404).json("Sorry, we could not find this movie, try again... ")
} else{
  // res.json(filteredNetflixData)
    res.status(200).json({response: filteredNetflixData, success: true, message: 'OK'}) 
} 
})


// baseURL = http://localhost:9000
// baseURL?firstQueryParam=FirstQueryParamValue&secondQueryParam=SecondQuesryParamValue&...&nthQueryParam=nthQueryParamValue
// baseURL/pathParamValue?firstQueryParam=FirstQueryParamValue&secondQueryParam=SecondQuesryParamValue&...&nthQueryParam=nthQueryParamValue



// Single Endpoint- params. send request to the server to get specefic data such as(release_year, type,)
// in browser http://localhost:9000/release_year/2016
app.get('/release_year/:release_year', (req, res) => {
const year = req.params.release_year
const allReleaseYear = netflixData.filter((item)=> item.release_year === +year)
res.json(allReleaseYear)
})

// http://localhost:9000/allMovies?type=Movie
app.get('/type/:type', (req, res)=>{
  const type = req.params
  const typeOfMovie = netflixData.filter((item) => item.type.toLocaleLowerCase() === type.toLocaleUpperCase())
  res.status(200).json(typeOfMovie)
})

// http://localhost:9000/release_year/2016?type=movie
app.get('/release_year/:release_year', (req, res) => {
const year = req.params.release_year
const typeOfMovie= req.query.type
let allReleaseYear = netflixData.filter((item)=> item.release_year === +year)

if(typeOfMovie){
  allReleaseYear= allReleaseYear.filter((item)=> item.type)
}
res.json(allReleaseYear)
})

//Get random show endpoint
app.get('/randomshow', (req, res)=>{
  const randomMovie=netflixData[Math.floor(Math.random()*netflixData.length)] 
  if(!randomMovie){
    res.status(404).json({
      response:'Somethimg went wrong, try it again later!', 
      success:false
    })
  }else{
    res.status(200).json({
      response:randomMovie,
      success: true
    })
  }
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
