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

const pagination = (data, pageNumber = 1, res) => {
  const pageSize = 50
  const startIndex = (pageNumber - 1) * pageSize
  const endIndex = startIndex + pageSize
  const itemsOnPage = data.slice(startIndex, endIndex)
  const totalOfPages = Math.ceil(data.length / pageSize)

  if (pageNumber < 1 || pageNumber > totalOfPages && data.length > 0) {
    res.status(400)
      .json({
        success: false,
        status_code: 404,
        message: `This page doesn't exist: page ${totalOfPages} is the last one.`
      })
  } else {
    const returnObject = {
      page: pageNumber,
      page_size: pageSize,
      items_on_page: itemsOnPage.length,
      total_of_pages: totalOfPages,
      total_of_results: data.length,
      success: true,
      results: itemsOnPage
    }

    return returnObject
  }
}

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
    fourth_taste,
    page
  } = req.query

  let allChocolatesData = chocolatesData

  if (company) {
    allChocolatesData = allChocolatesData.filter(
      chocolate => chocolate.company.toLowerCase() === company.toLowerCase()
    )
  }

  if (company_location) {
    allChocolatesData = allChocolatesData.filter(
      chocolate => chocolate.company_location.toLowerCase()
        === company_location.toLowerCase()
    )
  }

  if (review_date) {
    allChocolatesData = allChocolatesData.filter(
      chocolate => chocolate.review_date === +review_date
    )
  }

  if (country_of_bean_origin) {
    allChocolatesData = allChocolatesData.filter(
      chocolate => chocolate.country_of_bean_origin.toLowerCase()
        === country_of_bean_origin.toLowerCase()
    )
  }

  if (count_of_ingredients) {
    allChocolatesData = allChocolatesData.filter(
      chocolate => chocolate.count_of_ingredients === +count_of_ingredients
    )
  }
  // Still an issue for all boolean properties, give all false results 
  // with every query that is something else than TRUE
  if (has_cocoa_butter) {
    const booleanCocoaButter = req.query.has_cocoa_butter === "true"
    if (booleanCocoaButter) {
      allChocolatesData = allChocolatesData.filter(
        chocolate => chocolate.has_cocoa_butter
      )
    } else if (!booleanCocoaButter) {
      allChocolatesData = allChocolatesData.filter(
        chocolate => !chocolate.has_cocoa_butter
      )
    }
  }

  if (has_vanilla) {
    const booleanVanilla = req.query.has_vanilla === "true"
    if (booleanVanilla) {
      allChocolatesData = allChocolatesData.filter(
        chocolate => chocolate.has_vanilla
      )
    } else if (!booleanVanilla) {
      allChocolatesData = allChocolatesData.filter(
        chocolate => !chocolate.has_vanilla
      )
    }
  }

  if (has_lecithin) {
    const booleanLecithin = req.query.has_lecithin === "true"
    if (booleanLecithin) {
      allChocolatesData = allChocolatesData.filter(
        chocolate => chocolate.has_lecithin
      )
    } else if (!booleanLecithin) {
      allChocolatesData = allChocolatesData.filter(
        chocolate => !chocolate.has_lecithin
      )
    }
  }

  if (has_salt) {
    const booleanSalt = req.query.has_salt === "true"
    if (booleanSalt) {
      allChocolatesData = allChocolatesData.filter(
        chocolate => chocolate.has_salt
      )
    } else if (!booleanSalt) {
      allChocolatesData = allChocolatesData.filter(
        chocolate => !chocolate.has_salt
      )
    }
  }

  if (has_sugar) {
    const booleanSugar = req.query.has_sugar === "true"
    if (booleanSugar) {
      allChocolatesData = allChocolatesData.filter(
        chocolate => chocolate.has_sugar
      )
    } else if (!booleanSugar) {
      allChocolatesData = allChocolatesData.filter(
        chocolate => !chocolate.has_sugar
      )
    }
  }

  if (has_other_sweetener) {
    const booleanOtherSweetener = req.query.has_other_sweetener === "true"
    if (booleanOtherSweetener) {
      allChocolatesData = allChocolatesData.filter(
        chocolate => chocolate.has_other_sweetener
      )
    } else if (!booleanOtherSweetener) {
      allChocolatesData = allChocolatesData.filter(
        chocolate => !chocolate.has_other_sweetener
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

  res.status(200).json(pagination(allChocolatesData, page, res))
})

app.get("/chocolates/id", (req, res) => {
  res.status(400).json({
    success: false,
    status_code: 404,
    message: `Type an ID at the end of the path if you want to find a specific chocolate.`
  })
})

app.get("/chocolates/id/:id", (req, res) => {
  const { id } = req.params
  const chocolateByID = chocolatesData.find(chocolate => chocolate.id === +id)

  if (chocolateByID) {
    res.status(200).json({
      success: true,
      results: chocolateByID,
    })
  } else {
    res.status(404).json({
      success: false,
      status_code: 404,
      message: `No chocolate found with the id: ${id}`
    })
  }
})

app.get("/chocolates/name", (req, res) => {
  res.status(400).json({
    success: false,
    status_code: 404,
    message: `Type a name at the end of the path if you want to find a specific chocolate.`
  })
})

app.get("/chocolates/name/:name", (req, res) => {
  const { name } = req.params
  const chocolateByName =
    chocolatesData.find(
      chocolate => chocolate.specific_bean_origin_or_bar_name.toLowerCase() === name.toLowerCase()
    )

  if (chocolateByName) {
    res.status(200).json({
      success: true,
      results: chocolateByName,
    })
  } else {
    res.status(404).json({
      success: false,
      status_code: 404,
      message: `No chocolate found with the name: ${name}`
    })
  }
})

app.get("/chocolates/latest_reviews", (req, res) => {
  const { page } = req.query

  const latestReviewedChocolates = chocolatesData.filter(
    chocolate => chocolate.review_date >= 2019
  )

  res.status(200).json(pagination(latestReviewedChocolates, page, res))
})

app.get("/chocolates/oldest_reviews", (req, res) => {
  const { page } = req.query

  const oldestReviewedChocolates = chocolatesData.filter(
    chocolate => chocolate.review_date <= 2006
  )

  res.status(200).json(pagination(oldestReviewedChocolates, page, res))
})

app.get("/chocolates/best_ratings", (req, res) => {
  const { page } = req.query

  const bestRatedChocolates = chocolatesData.filter(
    chocolate => chocolate.rating >= 4
  )

  res.status(200).json(pagination(bestRatedChocolates, page, res))
})

app.get("/chocolates/worst_ratings", (req, res) => {
  const { page } = req.query

  const worstRatedChocolates = chocolatesData.filter(
    chocolate => chocolate.rating <= 2
  )

  res.status(200).json(pagination(worstRatedChocolates, page, res))
})

app.get("/chocolates/highest_in_cocoa", (req, res) => {
  const { page } = req.query

  const highestCocoaChocolates = chocolatesData.filter(
    chocolate => chocolate.cocoa_percentage >= 90
  )

  res.status(200).json(pagination(highestCocoaChocolates, page, res))
})

app.get("/chocolates/lowest_in_cocoa", (req, res) => {
  const { page } = req.query

  const lowestCocoaChocolates = chocolatesData.filter(
    chocolate => chocolate.cocoa_percentage <= 55
  )

  res.status(200).json(pagination(lowestCocoaChocolates, page, res))
})

app.get("/chocolates/most_ingredients", (req, res) => {
  const { page } = req.query

  const mostIngredientsChocolates = chocolatesData.filter(
    chocolate => chocolate.count_of_ingredients > 5
  )

  res.status(200).json(pagination(mostIngredientsChocolates, page, res))
})

app.get("/chocolates/least_ingredients", (req, res) => {
  const { page } = req.query

  const leastIngredientsChocolates = chocolatesData.filter(
    chocolate => chocolate.count_of_ingredients == 1
  )

  res.status(200).json(pagination(leastIngredientsChocolates, page, res))
})

app.get("/chocolates/without_sweetener", (req, res) => {
  const { page } = req.query

  const withoutSweetenerChocolates = chocolatesData.filter(
    chocolate => !chocolate.has_sugar && !chocolate.has_other_sweetener
  )

  res.status(200).json(pagination(withoutSweetenerChocolates, page, res))
})

// documentation
// readme to write

app.get('/endpoints', (req, res) => {
  res.send(allEndpoints(app))
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
