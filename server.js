import express from 'express'
import cors from 'cors'
import wineData from './data/wines.json'

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
  res.send('Hello world')
})

// Route to get all wines

app.get('/wines', (req, res) => {

  const { winery, title, country } = req.query

  let wineDataToSend = wineData

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
    wineDataToSend = wineDataToSend.filter((item) => item.country?.toLowerCase().indexOf(country.toLowerCase()) !== -1)
  }

    res.json({
      response: wineDataToSend,
      success: true,
    })
  })



  // const winery = req.query
  // const title = req.query
  
  // if (winery) {
  //   wineData = wineData.filter((wine) => wine.winery.toLowerCase() === winery)
  // } 

  // if (title) {
  //   wineData = wineData.filter((wine) => wine.title.toLowerCase() === title)
  // }

  // if (wineData.length === 0) {
  //   res.status(404).send('No such wine!')
  // }

  // res.json(wineData)

  app.get('/wines/title/:title', (req, res) => {
    const { title } = req.params 
  
    let wineByTitle = wineData
  
    wineByTitle = wineByTitle.find((item) => item.title.toLowerCase() === title.toLowerCase())
  
  
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
  


app.get('/wines/country/:country', (req, res) => {
  const { country } = req.params 

  let wineByCountry = wineData

  wineByCountry = wineByCountry.filter((item) => item.country?.toLowerCase().indexOf(country.toLowerCase()) !== -1)


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

// Pagination

// const paginatedResults = (model) => {
//   return (req, res, next) => {


//   const page = parseInt(req.query.page)
//   const limit = parseInt(req.query.limit)

//   const startIndex = (page - 1) * limit
//   const endIndex = page * limit

//   const results = {}

//   if (endIndex < model.length)
//     results.next = {
//       page: page + 1,
//       limit: limit
//     }

//   if (startIndex > 0) {
//     results.previous = {
//       page: page - 1,
//       limit: limit
//     }
//   }

//   results.results = model.slice(startIndex, endIndex)

//   res.paginatedResults = results
//   next()
//   }
// }


// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
