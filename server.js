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

app.get('/sales', (request, response) => {
  const { date } = request.query;
  const { region } = request.query;
  const { id } = request.query;

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

app.get('/sales/:region/ids/:id', (request,response) => {
const {region, id} = request.params;
const sale = avocadoSalesData.find(
  (sale) => sale.region === region && +sale.id === +id
);
response.json(sale);
});

// app.get('/sales/:region/:date', (request,response) => {

// });

//Dummy endpoint - red level
// app.get('/sales/:xlargebagssold', (request,response) => {
// //This will return smth
//response.send();
// });


//sales/region/id unique 
//sales/averageprice asc
//sales/averageprice_low <1
//sales/averageprice_high >1

// app.get('/sales/:region',(request,response) => {
//   const region = request.params;
//   const salesByRegion = avocadoSalesData.filter((item) => item.region === region);
//   response.json(salesByRegion);
// })
// app.get('/region/:region',(request,response) => {
//   const region = req.params.region;
//   const salesByRegion = avocadoSalesData.filter((item) => item.region === region);
//   response.json(salesByRegion);
// })

// app.get('/sorted_by_price', (req, res) => {
//   const price = req.query.price;
//   const sortedByPrice = avocadoSalesData.sort(function (a, b) { return b.price - a.price})
//   res.json(sortedByPrice);
// })

// full-date       = date-fullyear "-" date-month "-" date-mday

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
