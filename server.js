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

app.get("/", (req, res) => {
  res.send("Hello avocados!");
});

//total avocados
app.get("/avocadosales", (req, res) => {
  res.json(avocadoSalesData)
})

//avocados by region
app.get("/avocadosales/regions", (req, res) => {
const regions = req.query.region
const regionList = avocadoSalesData.map((sales) => sales.region)
if (regions) {
  const filteredRegions = avocadoSalesData.filter((sales) => sales.region === regions);
  res.status(200).json({
    success: true,
    message: "OK",
    body: {
      regions: filteredRegions
    }
  });
} else {
  res.status(200).json({
    success: true,
    message: "OK",
    body: {
      regions: regionList,
    }
  });
}
});

//avocados by month
app.get("/avocadosales/:month", (req, res) => {
  const month = req.params.month;
  const filteredAvocados = avocadoSalesData.filter((sales) => {
    // includes the month in the middle of the list
    return sales.date.includes('-' + month + '-');
  })
  res.json(filteredAvocados)
  })


//Avocado by id
app.get("/avocadosales/:id", (req, res) => {
  const id = req.params.id
  const singleAvocado = avocadoSalesData.find((avocado) => {
    return avocado.id === Number(id);
  })
  if (singleAvocado) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        avocado: singleAvocado
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Avocado not found",
      body: {}
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

