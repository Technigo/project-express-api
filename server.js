import express from "express"
import cors from "cors"
import allEndpoints from 'express-list-endpoints'

import chocolatesData from "./data/chocolates.json"

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!")
})

app.get("/chocolates", (req, res) => {
  const { company, company_location, review_date, country_of_bean_origin, count_of_ingredients, has_cocoa_butter,
    first_taste, second_taste } = req.query

  let allChocolatesData = chocolatesData

  if (company) {
    allChocolatesData = allChocolatesData.filter(
      chocolate => chocolate.company.toLowerCase() === company.toLowerCase()
    )
  }

  if (company_location) {
    allChocolatesData = allChocolatesData.filter(
      chocolate => chocolate.company_location.toLowerCase() === company_location.toLowerCase()
    )
  }

  if (review_date) {
    allChocolatesData = allChocolatesData.filter(
      chocolate => chocolate.review_date === +review_date
    )
  }

  if (country_of_bean_origin) {
    allChocolatesData = allChocolatesData.filter(
      chocolate => chocolate.country_of_bean_origin.toLowerCase() === country_of_bean_origin.toLowerCase()
    )
  }

  if (count_of_ingredients) {
    allChocolatesData = allChocolatesData.filter(
      chocolate => chocolate.count_of_ingredients === +count_of_ingredients
    )
  }

  // if (has_cocoa_butter) {
  //   allChocolatesData = allChocolatesData.filter(
  //     chocolate => chocolate.has_cocoa_butter === has_cocoa_butter
  //     )
  // }

  // if (has_cocoa_butter) {
  //   allChocolatesData = allChocolatesData.filter(
  //     chocolate => chocolate.has_cocoa_butter
  //   )
  // }

  // if (has_cocoa_butter == false) {
  //   allChocolatesData = allChocolatesData.filter(
  //     chocolate => chocolate.has_cocoa_butter == false
  //   )
  // }

  // if (!has_cocoa_butter) {
  //   allChocolatesData = allChocolatesData.filter(
  //     chocolate => chocolate.!has_cocoa_butter
  //   )
  // }

  // if (!has_cocoa_butter) {
  //   allChocolatesData = allChocolatesData.filter(
  //     chocolate => !chocolate.has_cocoa_butter
  //   )
  // }

  if (!has_cocoa_butter) {
    allChocolatesData = allChocolatesData.filter(
      chocolate => !chocolate.has_cocoa_butter
    )
  }


  if (first_taste) {
    allChocolatesData = allChocolatesData.filter(
      chocolate => chocolate.first_taste.toLowerCase() === first_taste.toLowerCase()
    )
  }

  if (second_taste) {
    allChocolatesData = allChocolatesData.filter(
      chocolate => chocolate.second_taste.toLowerCase() === second_taste.toLowerCase()
    )
  }


  res.status(200).json({
    data: allChocolatesData,
    success: true
  })
})





app.get('/endpoints', (req, res) => {
  res.send(allEndpoints(app))
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
