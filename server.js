import express from "express";
import cors from "cors";
import avocados from "./data/avocado-sales.json"


const port = process.env.PORT || 8080;
const app = express();


app.use(cors());
app.use(express.json());

//  Start defining your routes here
app.get("/", (req, res) => {
res.json({responseMessage: "If you`re desperado, eat an avocado! 🥑"})
});

app.get('/sales', (req, res) => {
  res.json(avocados)
  })


  app.get('/state/:state', (req, res) => {
    const state = req.query
    console.log(state)
    let salesFromState = data.filter((item) => item.region.toLowerCase() === state.toLowerCase())
    res.json(salesFromState)
  })

// Start the server
 app.listen(port, () => {
console.log(`Server running on http:localhost:${port}`);
 });