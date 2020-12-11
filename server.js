import express, { response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import avocadoSalesData from './data/avocado-sales.json'

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

console.log("this is node working")


// Start defining routes
app.get('/', (request, response) => {
  response.send('Hello, welcome to my api! Find some information about avocado sales in the US here. ')
})

//plural data returned endpoint
app.get('/sales', (request, response) => {
  const { date } = request.query;
  const { region } = request.query;
  if (date) {
    const salesByDate = avocadoSalesData.filter((item) => item.date === date);
    if(salesByDate.length > 0) {
      return response.json(salesByDate)
    } else if (salesByDate.length === 0) {
      return response.status(404).json("ERROR_NO_SALES_BY_THIS_DATE_FOUND")
    }
  }
  if (region){
    const salesByRegion = avocadoSalesData.filter((item) => item.region === region);
    if(salesByRegion > 0) {
      return response.json(salesByRegion)
    } else if (salesByRegion === 0) {
      return response.status(404).json("ERROR_NO_SALES_BY_THIS_REGION_FOUND")
    }
  } 
  else {
    response.json(avocadoSalesData);
  }
});

//show a list of regions where we can check avocado sales, take out duplicates
app.get('/sales/regions', (request, response) => {
  const regions = avocadoSalesData.map(region => region.region).sort()
  const uniqueRegions = [...new Set(regions)];
  response.json(uniqueRegions);
})

// sorted by average price in desc/asc order
app.get('/sales/price', (request,response ) => {
  const { sorted } = request.query;
  if(sorted === "desc") {
    const sortedByPrice = avocadoSalesData.sort((a, b) => Number(b.averagePrice) - Number(a.averagePrice))
    response.json(sortedByPrice)
  } else if (sorted === "asc") {
    const sortedByPriceAsc = avocadoSalesData.sort((a, b) => Number(a.averagePrice) - Number(b.averagePrice))
    response.json(sortedByPriceAsc)
  } else  {
    response.json(avocadoSalesData);
  }
});

//single result returned endpoint, a sales found by id in a specific region
app.get('/sales/:region/by_id/:id', (request,response) => {
  const {region, id} = request.params;
  const saleById = avocadoSalesData.find(
    (sale) => sale.region === region && +sale.id === +id
  );
  if(!saleById ) {
    response.status(404).send("ERROR_ID_NOT_FOUND");
  } else {
    response.json(saleById);
  };
});

//single result returned endpoint, a sales found by date in a specific region
app.get('/sales/:region/:date', (request,response) => {
  const {region, date} = request.params;
  const saleByDate = avocadoSalesData.find(
  (sale) => sale.region === region && sale.date === date
);
  if(!saleByDate ) {
    response.status(404).send("ERROR_DATE_NOT_FOUND");
  } else {
    response.json(saleByDate);
  };
});

//Dummy endpoint - red level
// app.get('/sales/average_price', (request,response) => {
// This will return multiple results that comply with a condition where averagePrice is lower or higher than 1
// The endpoints will look like localhost:8080/sales/average_price/price?=low and localhost:8080/sales/average_price/price?=high 
//response.send();
// });

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
