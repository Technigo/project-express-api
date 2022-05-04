import express from "express";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
import avocados from "./data/avocado-sales.json";

// import { json } from "express/lib/response";
// import { resetWatchers } from "nodemon/lib/monitor/watch";
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

app.get("/avocados", (req, res) => {
  const { date, region } = req.query;

  let allAvocados = avocados;

  if (region) {
    allAvocados = allAvocados.filter(
      (avocado) => avocado.region.toLowerCase() === region.toLowerCase()
    );
  }

  if (date) {
    allAvocados = allAvocados.filter((avocado) => avocado.date === date);
  }
  res.status(200).json({
    data: allAvocados,
    success: true,
  });
});

//Date
app.get("/avocados/date/:date", (req, res) => {
  const { date } = req.params;

  const avocadoByDate = avocados.find((avocado) => avocado.date === date);

  if (!avocadoByDate) {
    res.status(404).json({
      data: "Not found",
      success: false,
    });
  } else {
    res.status(200).json({
      data: avocadoByDate,
      success: true,
    });
  }
});

// //Region
app.get("/avocados/region/:region", (req, res) => {
  const { region } = req.params;

  const avocadoByRegion = avocados.filter(
    (avocado) => avocado.region.toLowerCase() === region.toLowerCase()
  );

  res.status(200).json({
    data: avocadoByRegion,
    success: true,
  });
});

// Price < 1.0
// app.get("/avocados/averagePrice/:averagePrice", (req, res) => {
//   const avocadoAveragePrice = avocados.filter(
//     (price) => price.averagePrice < 1.0
//   );
//   res.status(200).json(avocadoAveragePrice);
// });

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
