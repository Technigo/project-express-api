import express from 'express'
import cors from 'cors'
import wineData from './data/wines.json'
import listEndpoints from 'express-list-endpoints'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

// Route to get all wines

app.get('/wines', (req, res) => {

  // Pagination

  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)

  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const results = {}

  if (endIndex < wineData.length)
    results.next = {
      page: page + 1,
      limit: limit
    }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit
    }
  }

  results.results = wineData.slice(startIndex, endIndex)

  res.json(results)

})

  // Route for query filtering

  
  app.get ('/wines/search', (req, res) => {
 

  // Queries for sorting


  const { points, price, winery, title, country } = req.query

  let wineDataToSend = wineData

  // Query by points

  if (points) {
    wineDataToSend = wineDataToSend.filter((item) => item.points.indexOf(points) !== -1)
  }

  // Query by price

  if (price) {
    wineDataToSend = wineDataToSend.filter((item) => item.price === +price && item.price !== null)
  }

  // Query by winery

  if (winery) {
    wineDataToSend = wineDataToSend.filter((item) => item.winery.toLowerCase().indexOf(winery.toLowerCase()) !== -1)
  }

  // Query by title

  if (title) {
    wineDataToSend = wineDataToSend.filter((item) => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1)
  }

  // Query by country 

  if (country) {
    wineDataToSend = wineDataToSend.filter((item) => item.country?.toLowerCase().indexOf(country.toLowerCase()) !== -1 && item.country !== null)
  }
  
    res.json({
      response: wineDataToSend,
      success: true,
    })
  })

  // Route to get wine by title

  app.get('/wines/titles/:title', (req, res) => {
    const { title } = req.params 
  
    let wineByTitle = wineData
  
    wineByTitle = wineByTitle.filter((item) => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1)
  
  
    if (!wineByTitle) {
      res.status(404).json({
        response: 'No such title!',
        success: false
      })
    } else {
      res.status(200).json({
        response: wineByTitle,
        success: true
      })
    }
  })

// Route to get wine by taster

app.get('/wines/tasters/:taster_name', (req, res) => {
  const { taster_name } = req.params 

  let wineByTaster = wineData

  wineByTaster = wineByTaster.filter((item) => item.taster_name?.toLowerCase().indexOf(taster_name.toLowerCase()) !== -1 && item.taster_name !== null)


  if (!wineByTaster) {
    res.status(404).json({
      response: 'No such person!',
      success: false
    })
  } else {
    res.status(200).json({
      response: wineByTaster,
      success: true
    })
  }
})

// Route to get wine by twitter usernames

app.get('/wines/tasters/twitter/:twitter_name', (req, res) => {
  const { twitter_name } = req.params 

  let wineByTaster = wineData

  wineByTaster = wineByTaster.filter((item) => item.taster_twitter_handle?.toLowerCase().indexOf(twitter_name.toLowerCase()) !== -1 && item.taster_twitter_handle !== null)


  if (!wineByTaster) {
    res.status(404).json({
      response: 'No such person!',
      success: false
    })
  } else {
    res.status(200).json({
      response: wineByTaster,
      success: true
    })
  }
})

// Route to get wines by country

app.get('/wines/countries/:country', (req, res) => {
  const { country } = req.params 
  const { province } = req.query

  let wineByCountry = wineData

  wineByCountry = wineByCountry.filter((item) => item.country?.toLowerCase().indexOf(country.toLowerCase()) !== -1)

  if (province) {
    wineByCountry = wineByCountry.filter((item) => item.province?.toLowerCase().indexOf(province.toLowerCase()) !== -1)
  }


  if (!wineByCountry) {
    res.status(404).json({
      response: 'No such country!',
      success: false
    })
  } else {
    res.status(200).json({
      response: wineByCountry,
      success: true
    })
  }
})

// Route to get wines by province

app.get('/wines/countries/provinces/:province', (req, res) => {
  const { province } = req.params 

  let wineByProvince = wineData

  wineByProvince = wineByProvince.filter((item) => item.province?.toLowerCase().indexOf(province.toLowerCase()) !== -1 && item.province    !== null)


  if (!wineByProvince) {
    res.status(404).json({
      response: 'No such province!',
      success: false
    })
  } else {
    res.status(200).json({
      response: wineByProvince,
      success: true
    })
  }
})

// Route to get wines by variety

app.get('/wines/varieties/:variety', (req, res) => {
  const { variety } = req.params 

  let wineByVariety = wineData

  wineByVariety = wineByVariety.filter((item) => item.variety?.toLowerCase().indexOf(variety.toLowerCase()) !== -1)


  if (!wineByVariety) {
    res.status(404).json({
      response: 'No such variety!',
      success: false
    })
  } else {
    res.status(200).json({
      response: wineByVariety,
      success: true
    })
  }
})

// Sort wines by top rating

app.get('/wines/top_rated', (req, res) => {
  let topRatedWines = wineData.sort((min, max) => max.points - min.points)


  const top50 = topRatedWines.slice(0, 50)
  
  res.status(200).json({
    response: top50,
    success: true
  })
})

// Sort wine by most expensive

app.get('/wines/most_expensive', (req, res) => {
  let mostExpensiveWines = wineData.sort((min, max) => max.price - min.price)

  const top50 = mostExpensiveWines.slice(0, 50)

  res.status(200).json({
    response: top50,
    success: true
  })
})


// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
