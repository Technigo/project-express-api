import express from "express";
import cors from "cors";
import avocados from "./data/avocado-sales.json";
import listEndpoints from "express-list-endpoints";


const port = process.env.PORT || 8080;
const app = express();


app.use(cors());
app.use(express.json());

//  Start defining your routes here
app.get("/", (req, res) => {
  res.json({responseMessage: "If you`re desperado, eat an avocado! 🥑", data: listEndpoints(app)})
});

app.get('/sales', (req, res) => {
  res.json(avocados)
})

app.get("/sales/:id", (req, res) => {
  const id = req.params.id
  const AvocadoSaleId = avocados.find((item) => item.id === +id)
//404
  if (!AvocadoSaleId) {
    res.status(404).json({ errorMessage: "No avocado sale with this id found. Try to find the right id" })
  }
  res.json(AvocadoSaleId)
})

app.get("/avocadosales", (req,res) => {
  const { region, id, averageprice } = req.query;
  let avocadosales = [...avocados];

  if (region) {
    avocadosales = avocadosales.filter((item) => item.region.toLowerCase() === region.toLowerCase())
  }

  if (id) {
    avocadosales = avocadosales.filter((item) => item.id === +id)
  }

  // if (averageprice) {
  //   avocadosales = avocadosales.filter((item) => item.averagePrice === Number(averageprice))
  // } Does not work dunno why

  res.status(200).json({ 
    success: true,
    message: "OK",
    response: {
      avocados: avocadosales
    }
  });
});

app.get('/state/:state', (req, res) => {
  const state = req.params.state;
  const salesFromState = avocados.filter((item) => item.region.toLowerCase() === state.toLowerCase())
  res.status(200).json(salesFromState)
})

  app.get("/albany", (req, res) => {
    res.send(avocados.filter((item) => item.region === "Albany"))
  })

  app.get("/luciasdaysales", (req, res) => {
    res.send(avocados.filter((item) => item.date === "2015-12-13"))
  })

  app.get("/firstitem", (req, res) => {
    res.send(avocados.filter((item) => item.id === +1))
  })


// Start the server
 app.listen(port, () => {
console.log(`Server running on http:localhost:${port}`);
 });