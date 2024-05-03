import express from "express";
import cors from "cors";
import avocadoData from "./data/avocado-sales.json"
import expressListEndpoints from 'express-list-endpoints';

const port = process.env.PORT || 9000;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here

app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app);
  res.json(endpoints)
})
 
app.get("/avocados", (req, res) => {
  res.send(avocadoData);
});

app.get("/avocados/:avocadoId", (req, res) => {
  const {avocadoId} = req.params

  const avocado = avocadoData.find(avocado => +avocadoId === avocado.id)
  
  if(avocado){
    res.json(avocado)
  } else {
    res.status (404).send ('Avocado is not found')
  }
})

app.get("/date", (req, res) => {
  const avocadoDate = req.query.date

  let newAvocado = [...avocadoData]

  if(avocadoDate) {
    newAvocado = newAvocado.filter(item => item.date.includes(avocadoDate))
  } 
  if(!avocadoDate){
    res.json(newAvocado)
  } else{
    res.status(404).send ('Avocado is not found')
  }})

  
app.get("/region", (req, res) => {
  const regionName = req.query.region

  let countryName = [...avocadoData]

  if(regionName) {
    countryName = countryName.filter(item => item.region.toLowerCase().includes(regionName.toLowerCase()))
  }

  if(regionName.length>0){
    res.json(countryName)
  } else {
    res.status(404).send ('Avocado is not found')
  }

})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
