import express from "express";
import cors from "cors";
import streams from "./data/netflix-titles.json";


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
  res.send("NETFLIX STREAMS. This is an API with information about different Netflix movies and tv shows");
});

// Simple get request, sending back the complete list
app.get("/streams", (req, res) => {
  res.status(200).json({
    data: streams,
    success: true})
})

// Find one specific movie/show by name
app.get('/streams/name/:title', (req, res) => {
  const { title } = req.params

  const netflixTitle = streams.find(
  (stream) => stream.title.toLowerCase() === title.toLowerCase()
  )

  if(!netflixTitle){
    res.status(404).json({
      data: "This title is not found",
      success: false })
  } else {
    res.status(200).json({
      data: netflixTitle,
      success: true })
  }
  })

// Filter movies/shows by release year
  app.get('/streams/year/:release_year', (req, res) => {
    const { release_year } = req.params

    const releaseYear = streams.filter(
      (stream) => stream.release_year === +release_year
    )

  res.status(200).json({
      data: releaseYear,
      success: true })
    
  })

// Filter by dynamic type, i.e. Movie or TV Show... Maybe change it.
app.get('/streams/type/:type', (req, res) => {
  const netflixTypes = streams.filter(
  (stream) => stream.type.toLowerCase() === req.params.type.toLowerCase()
  )
    res.status(200).json(netflixTypes) 
  })



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



////////////////////////////////////////////////////////////

// // Getting the entire data structure
// app.get('/members', (req, res) => {

  // //  We are using json 99% of the times. json sends an array of objects or an object, so that the frontend can unpack it.
  // res.status(200).json(members)
  
  // send is more universal, can send all different type of data.
  // res.send()
  // })
  
  // // Getting one specific object sorted by the name in the params.
  // app.get('/members/:name', (req, res) => {
  // const memberByName = members.find(
  // (member) => member.name === req.params.name
  // )
  
  // res.status(200).json(memberByName)
  // })

  
  // QUERY PARAMETERS

  // app.get("/netflixStreams", (req, res) => {
  //   const { type, release_year } = req.query

  //   let allStreams = netflixDatas

  //   if(type){
  //     allStreams = allStreams.filter(
  //     (stream) => stream.type.toLowerCase() === type.toLowerCase()
  //     )
  //   }

  //   if(release_year) {
  //     allStreams = allStreams.filter(
  //       (stream) => stream.release_year === release_year
  //       )
  //   }

  //   res.status(200).json({
  //     data: allStreams,
  //     success: true })
  // })