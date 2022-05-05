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
  const {
    company,
    company_location,
    review_date,
    country_of_bean_origin,
    count_of_ingredients,
    has_cocoa_butter,
    has_vanilla,
    has_lecithin,
    has_salt,
    has_sugar,
    has_other_sweetener,
    first_taste,
    second_taste,
    third_taste,
    fourth_taste
  } = req.query

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

  if (has_cocoa_butter) {
    if (has_cocoa_butter.includes(false)) {
      allChocolatesData = allChocolatesData.filter(
        chocolate => chocolate.has_cocoa_butter === false
      )
    } else {
      allChocolatesData = allChocolatesData.filter(
        chocolate => chocolate.has_cocoa_butter === true
      )
    }
  }

  if (has_vanilla) {
    if (has_vanilla.includes(false)) {
      allChocolatesData = allChocolatesData.filter(
        chocolate => chocolate.has_vanilla === false
      )
    } else {
      allChocolatesData = allChocolatesData.filter(
        chocolate => chocolate.has_vanilla === true
      )
    }
  }

  if (has_lecithin) {
    if (has_lecithin.includes(false)) {
      allChocolatesData = allChocolatesData.filter(
        chocolate => chocolate.has_lecithin === false
      )
    } else {
      allChocolatesData = allChocolatesData.filter(
        chocolate => chocolate.has_lecithin === true
      )
    }
  }

  if (has_salt) {
    if (has_salt.includes(false)) {
      allChocolatesData = allChocolatesData.filter(
        chocolate => chocolate.has_salt === false
      )
    } else {
      allChocolatesData = allChocolatesData.filter(
        chocolate => chocolate.has_salt === true
      )
    }
  }

  if (has_sugar) {
    if (has_sugar.includes(false)) {
      allChocolatesData = allChocolatesData.filter(
        chocolate => chocolate.has_sugar === false
      )
    } else {
      allChocolatesData = allChocolatesData.filter(
        chocolate => chocolate.has_sugar === true
      )
    }
  }

  if (has_other_sweetener) {
    if (has_other_sweetener.includes(false)) {
      allChocolatesData = allChocolatesData.filter(
        chocolate => chocolate.has_other_sweetener === false
      )
    } else {
      allChocolatesData = allChocolatesData.filter(
        chocolate => chocolate.has_other_sweetener === true
      )
    }
  }

  if (first_taste) {
    allChocolatesData = allChocolatesData.filter(
      chocolate => chocolate.first_taste.toLowerCase()
        .includes(first_taste.toLowerCase())
    )
  }

  if (second_taste) {
    allChocolatesData = allChocolatesData.filter(
      chocolate => chocolate.second_taste.toLowerCase()
        .includes(second_taste.toLowerCase())
    )
  }

  if (third_taste) {
    allChocolatesData = allChocolatesData.filter(
      chocolate => chocolate.third_taste.toLowerCase()
        .includes(third_taste.toLowerCase())
    )
  }

  if (fourth_taste) {
    allChocolatesData = allChocolatesData.filter(
      chocolate => chocolate.fourth_taste.toLowerCase()
        .includes(fourth_taste.toLowerCase())
    )
  }

  res.status(200).json({
    data: allChocolatesData,
    success: true
  })
})

app.get("/chocolates/id/:id", (req, res) => {
  const { id } = req.params
  const chocolateByID = chocolatesData.find(chocolate => chocolate.id === +id)

  if (!chocolateByID) {
    res.status(404).json({
      data: `No chocolate found with the id: ${id}`,
      success: false,
    })
  } else {
    res.status(200).json({
      data: chocolateByID,
      success: true,
    })
  }
})

app.get("/chocolates/name/:name", (req, res) => {
  const { name } = req.params
  const chocolateByName =
    chocolatesData.find(
      chocolate => chocolate.specific_bean_origin_or_bar_name.toLowerCase() === name.toLowerCase()
    )

  if (!chocolateByName) {
    res.status(404).json({
      data: `No chocolate found with the name: ${name}`,
      success: false,
    })
  } else {
    res.status(200).json({
      data: chocolateByName,
      success: true,
    })
  }
})

app.get("/chocolates/latest_reviews", (req, res) => {
  const latestReviewedChocolates = chocolatesData.filter(chocolate => chocolate.review_date >= 2019)

  res.status(200).json({
    data: latestReviewedChocolates,
    success: true
  })
})

app.get("/chocolates/oldest_reviews", (req, res) => {
  const oldestReviewedChocolates = chocolatesData.filter(chocolate => chocolate.review_date <= 2006)

  res.status(200).json({
    data: oldestReviewedChocolates,
    success: true
  })
})

app.get("/chocolates/best_ratings", (req, res) => {
  const bestRatedChocolates = chocolatesData.filter(chocolate => chocolate.rating >= 4)

  res.status(200).json({
    data: bestRatedChocolates,
    success: true
  })
})

app.get("/chocolates/worst_ratings", (req, res) => {
  const worstRatedChocolates = chocolatesData.filter(chocolate => chocolate.rating <= 1.75)

  res.status(200).json({
    data: worstRatedChocolates,
    success: true
  })
})

app.get("/chocolates/highest_in_cocoa", (req, res) => {
  const highestCocoaChocolates = chocolatesData.filter(chocolate => chocolate.cocoa_percentage >= 90)

  res.status(200).json({
    data: highestCocoaChocolates,
    success: true
  })
})

app.get("/chocolates/lowest_in_cocoa", (req, res) => {
  const lowestCocoaChocolates = chocolatesData.filter(chocolate => chocolate.cocoa_percentage <= 55)

  res.status(200).json({
    data: lowestCocoaChocolates,
    success: true
  })
})

app.get("/chocolates/most_ingredients", (req, res) => {
  const mostIngredientsChocolates = chocolatesData.filter(chocolate => chocolate.count_of_ingredients > 5)

  res.status(200).json({
    data: mostIngredientsChocolates,
    success: true
  })
})

app.get("/chocolates/least_ingredients", (req, res) => {
  const leastIngredientsChocolates = chocolatesData.filter(chocolate => chocolate.count_of_ingredients = 1)

  res.status(200).json({
    data: leastIngredientsChocolates,
    success: true
  })
})

// another endpoint to add: items with no sweetener at all (no sugar AND no other sweetener)
// pages in query
// think of other status codes?
// documentation
// readme to write
// another endpoint idea: filter and combine 2 or more properties(ex: highest ratings without sugar)

app.get('/endpoints', (req, res) => {
  res.send(allEndpoints(app))
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
