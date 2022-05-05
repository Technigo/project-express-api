import express from "express";
import cors from "cors";

 import avocadoSalesData from "./data/avocado-sales.json";

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
  res.send("Avocado sales data api. Endpoints: /api, dynamic routes: /api/region, /api/region/id. Query parameter: /api?date=");
});

app.get("/api", (req, res) => {
  const { date } = req.query;

  let allAvocadoSalesData = avocadoSalesData;

  if (date) {
    allAvocadoSalesData = allAvocadoSalesData.filter((salesData) => 
      salesData.date === date
    );
  }

  res.status(200).json({
    data: allAvocadoSalesData,
    success: true
  });
});

app.get("/api/:regions", (req, res) => {
  const { regions } = req.params;

  //how to make this dataPerRegion accessible in the next app.get?
  const dataPerRegion = avocadoSalesData.filter((avocadoData) => 
    avocadoData.region.toLowerCase() === regions.toLowerCase()
  );

  //regions if statements for printing
  if (dataPerRegion && dataPerRegion.length !== 0) {
    res.status(200).send({
      data: dataPerRegion,  
      success: true
    });
  } else if (dataPerRegion.length === 0) {
    res.status(200).send({
      data: 'Response is successful but no region with that name exists',  
      success: true
    });
  } else {
    res.status(404).send({
      data: 'Not found',
      success: false
    });
  }
});

app.get("/api/:regions/:id", (req, res) => {
  const { id, regions } = req.params;

  const dataPerRegion = avocadoSalesData.filter((avocadoData) => 
    avocadoData.region.toLowerCase() === regions.toLowerCase()
  );
  //filtrerar ut array med alla valda regions

  //kollar om något elements (objekt) id matchar med anigvet req.param id 
  const idPerRegion = dataPerRegion.find((idData) => 
    parseInt(idData.id) === parseInt(id)
  );

  //om den har hittat angivet id som matchar ett elements id i arrayen med valda regioner, kör res.status(200)
  if (idPerRegion) {
    res.status(200).send({
      data: idPerRegion,
      success: true
    });
  } else {
    res.status(200).send({
      data: 'No region with such id found',
      success: true
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
