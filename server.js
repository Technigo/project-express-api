import express from "express";
import cors from "cors";

import data from "./data/avocado-sales.json";
import listEndpoints from "express-list-endpoints";
import { getItemDescriptor } from "@babel/core/lib/config/item";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here

// app.get("/", (req, res) => {
//   res.send("Hello Aschwin");
// });

app.get("/endpoints", (req, res) => {
  res.send(listEndpoints(app));
});

app.get("/", (req, res) => {
  res.json(data);
});

app.get("/avocado-sales", (req, res) => {
  const { Region } = req.query;

  if (Region) {
    const filteredData = data.filter((item) => item.region.toLowerCase().indexOf(Region.toLowerCase()) !== -1);

    res.json({
      response: filteredData,
      success: true,
    });
  }

  res.json({
    response: data,
    success: true,
  });
});

app.get("/users", (req, res) => {
  const users = [
    { id: 1, name: "Immanuël", age: 13 },
    { id: 2, name: "Corona", age: 71 },
    { id: 3, name: "Mendy", age: 36 },
    { id: 4, name: "Thiago", age: 4 },
  ];

  res.json(users);
});

// get a specific sale based on id, using param
app.get("/avocado-sales/id/:id", (req, res) => {
  const { id } = req.params;

  const salesId = data.find((sales) => sales.id === +id);

  if (!salesId) {
    res.status(404).send("No sales found");
  } else {
    res.json(salesId);
  }
});

app.get("/avocado-sales/averagePrice/:averagePrice", (req, res) => {
  const { averagePrice } = req.params;

  const price = data.find((item) => item.averagePrice === +averagePrice);

  if (!price) {
    res.status(404).json({
      response: "No average price is found",
      success: false,
    });
  } else {
    res.status(200).json({
      response: price,
      success: true,
    });
  }

  res.json({
    response: data,
    succes: true,
  });
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port} Aschwin`);
});
