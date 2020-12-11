import express, { response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import avocadoSalesData from './data/avocado-sales.json'



//console.log(avocadoSalesData.length);
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

console.log("this is node working")


// Start defining your routes here
app.get('/', (request, response) => {
  response.send('Hello, welcome to my api! Find some information about avocado sales here. ')
})

//plural data returned endpoint

app.get('/sales', (request, response) => {
  const { date } = request.query;
  const { region } = request.query;

  if (date) {
    const salesByDate = avocadoSalesData.filter((item) => item.date === date);
    response.json(salesByDate); 
  } else if (region) {
    const salesByRegion = avocadoSalesData.filter((item) => item.region === region);
    response.json(salesByRegion); 
  } else {
    response.json(avocadoSalesData);
  }
});

//singular piece of data returned endpoint
app.get('/sales/:region/by_id/:id', (request,response) => {
  const {region, id} = request.params;
  const saleById = avocadoSalesData.find(
    (sale) => sale.region === region && +sale.id === +id
  );
//this does not work
  if(!id) {
    response.status(404).send(ERROR_ID_NOT_FOUND)
  } else {
    response.json(saleById);
  };
});

//MY QUESTIONS
//is it ok to write _ bettween words in an endpoint
//is it possible to combine paths and query parameters 
//is it good practice to do it as i did in lines 27-40
//line 43 by_id ?
//does it make sense to create specific endpoint for things that a client can find in a search

app.get('/sales/:region/:date', (request,response) => {
  const {region, date} = request.params;
  const saleByDate = avocadoSalesData.find(
  (sale) => sale.region === region && sale.date === date
);
response.json(saleByDate);
});

//Dummy endpoint - red level
// app.get('/sales/:xlargebagssold', (request,response) => {
// //This will return smth
//response.send();
// });


// /sales?sorted=true

//sales/region/averageprice-sorted asc
//sales/averageprice_low <1
//sales/averageprice_high >1


// app.get('/sorted_by_price', (req, res) => {
//   const price = req.query.price;
//   const sortedByPrice = avocadoSalesData.sort(function (a, b) { return b.price - a.price})
//   res.json(sortedByPrice);
// })


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
