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

  //ERRORS ARE UNDEFINED
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

// SORT NOT WORKING sorted by average price '/sales?sorted=desc'
app.get('/sales', (request,response ) => {
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

//app.get('/sales?sorted_by_price=high', (request,response ) => 

//singular piece of data returned endpoint
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

//MY QUESTIONS
//is it ok to write _ bettween words in an endpointline 43 by_id ?
//is it possible to combine paths and query parameters 
//is it good practice to do it as i did in lines 27-40
//does it make sense to create specific endpoint for things that a client can find in a search

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
// app.get('/sales/:xlargebagssold', (request,response) => {
// //This will return count of xlarge bags sold in the US in total
//response.send();
// });


//sales/region/averageprice-sorted asc
//sales/averageprice_low <1
//sales/averageprice_high >1
//i want to get only regions sales/regions

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
