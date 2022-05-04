import express from "express";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
 import avocadoSalesData from "./data/avocado-sales.json";
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
  res.send("Hello Technigo!");
});

app.get("/api", (req, res) => {
  res.status(200).json({
    data: avocadoSalesData,
    success: true
  });
  console.log(avocadoSalesData);
});

app.get("/api/:region/:id?", (req, res) => {
  const { region } = req.params;

  const dataPerRegion = avocadoSalesData.filter((avocadoData) => 
    avocadoData.region.toLowerCase() === region.toLowerCase()
  );

  if (dataPerRegion && dataPerRegion.length !== 0) {
    res.status(200).send({
      data: dataPerRegion,  
      success: true
    });
  } else {
    res.status(404).send({
      data: 'No region with this name exists',
      success: false
    });
  }

  // const idForRegion = avocadoSalesData.find((idData) => 
  //   idData.id === parseInt(req.params.id)
  // );

  // if (idForRegion) {
  //   res.status(200).send(idForRegion);  
  // }

});

// app.get("/api/:region/:id?", (req, res) => {
//   const dataPerRegion = avocadoSalesData.filter((avocadoData) => 
//     avocadoData.region === req.params.region
//   );

//   if (req.params.id) {
//     const idPerRegion = avocadoSalesData.find((idData) => 
//       idData.id === parseInt(req.params.id)
//     );
    
//     res.status(200).json(idPerRegion);
//   }

//   res.status(200).json(dataPerRegion);
  
//   //if req.params.region === undefined or null or doesnt exist {
//     //res.status(404).json({'Error: no matching result'})
//   //} else {print the status 200 line of code}
// });



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
