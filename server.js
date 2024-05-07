import express from "express"
import cors from "cors"
import expressListEndpoints from "express-list-endpoints"

//Import data from sneaker json file
import sneakerData from "./data/sneakers.json"

// Defines the port the app will run on
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Route handler
//http://localhost:8080/
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app)

  const endpointsList = endpoints.map((endpoint) => {
    if (endpoint.path === "/sneakers") {
      endpoint.query = ["name", "brand", "color", "price"]
    } return endpoint
  })
  res.json(endpointsList)
})

//Get all sneakers
app.get("/sneakers", (req, res) => {
  let filterSneakers = [...sneakerData]

  //Query for sneaker name search
  const nameSearch = req.query.name

  if (nameSearch) {
    filterSneakers = filterSneakers.filter((sneaker) =>
      sneaker.name.toLowerCase().includes(nameSearch.toLowerCase())
    )
  }

  //Query for sneaker brand search
  const brandSearch = req.query.brand
  if (brandSearch) {
    filterSneakers = filterSneakers.filter(
      (sneaker) => sneaker.brand.toLowerCase() === brandSearch.toLowerCase()
    )
  }

  //Query for color search
  const colorSearch = req.query.color
  if (colorSearch) {
    filterSneakers = filterSneakers.filter((sneaker) =>
      sneaker.color.toLowerCase().includes(colorSearch.toLowerCase())
    )
  }

  //Query to show sneakers under the price of 1000
  const priceSearch = req.query.price
  if (priceSearch) {
    filterSneakers = filterSneakers.filter(
      (sneaker) => sneaker.price < 1000
    )
  }

  if (filterSneakers.length > 0) {
    res.json(filterSneakers)
  } else {
    res.status(404).send("No sneaker was found, please try again.")
  }
})

//Filter sneakers that are in-stock otherwise show 404
app.get("/sneakers/in-stock", (req, res) => {
  const sneakersInStock = sneakerData.filter((sneaker) => sneaker.inStock)

  if (sneakersInStock.length > 0) {
    res.json(sneakersInStock)
  } else {
    res.status(404).send("Sorry, no sneakers in stock right now!")
  }
})

//Get only one sneaker based on id
//Example on how the URL could look like: http://localhost:8080/sneakers/12
app.get("/sneakers/:sneakerId", (req, res) => {
  //Destruture the id
  const { sneakerId } = req.params

  const sneaker = sneakerData.find((sneaker) => +sneakerId === sneaker.id)

  if (sneaker) {
    res.json(sneaker)
  } else {
    res.status(404).send("No sneaker was found, please try again.")
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
