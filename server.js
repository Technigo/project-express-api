import express from "express"
import cors from "cors"
import allEndpoints from "express-list-endpoints"

import chocolatesData from "./data/chocolates.json"

const port = process.env.PORT || 8080
const app = express()

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
        status_code: 400,
        message: `Bad request: this page doesn't exist, page ${totalOfPages} is the last one.`
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

app.get("/", (req, res) => {
  res.send(
    {
      "Welcome": "Sweetest API is all about chocolate. 🍫 Enjoy!",
      "Routes (can all be combined with query parameter: page=page": {
        "/": "Documentation",
        "/endpoints": "All endpoints",
        "/chocolates": "Get all chocolates.",
        "/chocolates/latest_reviews": "Get the chocolates with the latest reviews (>= 2019).",
        "/chocolates/oldest_reviews": "Get the chocolates with the oldest reviews (<= 2006).",
        "/chocolates/best_ratings": "Get the chocolates with the best ratings (>= 4).",
        "/chocolates/worst_ratings": "Get the chocolates with the worst ratings (<= 2).",
        "/chocolates/highest_in_cocoa": "Get the chocolates with the highest percentage of cocoa (>= 90).",
        "/chocolates/lowest_in_cocoa": "Get the chocolates with the lowest percentage of cocoa (<= 55).",
        "/chocolates/most_ingredients": "Get the chocolates with the most ingredients (>= 6).",
        "/chocolates/least_ingredients": "Get the chocolates with the least ingredients (== 1).",
        "/chocolates/without_sweetener": "Get the chocolates without any sweetener (no sugar or other_sweetener)."
      },
      "Routes with path parameters": {
        "/chocolates/name/${name}": "Get a chocolate by name.",
        "/chocolates/id/${id}": "Get a chocolate by ID."
      },

      "Query parameters (can be combined together)": {
        "/chocolates?company=string": "Filter the chocolates from a specific company.",
        "/chocolates?company_location=string": "Filter the chocolates from a specific company location.",
        "/chocolates?review_date=number": "Filter the chocolates from a specific review date.",
        "/chocolates?country_of_bean_origin=string": "Filter the chocolates from a specific country of bean origin.",
        "/chocolates?count_of_ingredients=number": "Filter the chocolates with a specific count of ingredients.",
        "/chocolates?has_cocoa_butter=boolean": "Filter the chocolates with cocoa butter or not.",
        "/chocolates?has_vanilla=boolean": "Filter the chocolates with vanilla or not.",
        "/chocolates?has_lecithin=boolean": "Filter the chocolates with lecithin or not.",
        "/chocolates?has_sugar=boolean": "Filter the chocolates with sugar or not.",
        "/chocolates?has_other_sweetener=boolean": "Filter the chocolates with other sweetener or not.",
        "/chocolates?first_taste=string": "Filter the chocolates with a first taste that includes the string.",
        "/chocolates?second_taste=string": "Filter the chocolates with a second taste that includes the string.",
        "/chocolates?third_taste=string": "Filter the chocolates with a third taste that includes the string.",
        "/chocolates?fourth_taste=string": "Filter the chocolates with a fourth taste that includes the string.",
        "Combination example": "/chocolates?company_location=France&review_date=2019&has_vanilla=true"
      }
    }
  )
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

  if (company === "" ||
    company_location === "" ||
    review_date === "" ||
    country_of_bean_origin === "" ||
    count_of_ingredients === "" ||
    has_cocoa_butter === "" ||
    has_vanilla === "" ||
    has_lecithin === "" ||
    has_salt === "" ||
    has_sugar === "" ||
    has_other_sweetener === "" ||
    first_taste === "" ||
    second_taste === "" ||
    third_taste === "" ||
    fourth_taste === "" ||
    page === "") {
    res.status(400).json({
      success: false,
      status_code: 400,
      message: "At least one of the query parameters in the path has no value, please make sure that you use property=value."
    })
  }

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

  if (has_cocoa_butter) {
    const trueCocoaButter = req.query.has_cocoa_butter === "true"
    const falseCocoaButter = req.query.has_cocoa_butter === "false"

    if (trueCocoaButter) {
      allChocolatesData = allChocolatesData.filter(
        chocolate => chocolate.has_cocoa_butter
      )
    } else if (falseCocoaButter) {
      allChocolatesData = allChocolatesData.filter(
        chocolate => !chocolate.has_cocoa_butter
      )
    } else {
      allChocolatesData = allChocolatesData.filter(
        chocolate => chocolate.has_cocoa_butter === has_cocoa_butter
      )
    }
  }

  if (has_vanilla) {
    const trueVanilla = req.query.has_vanilla === "true"
    const falseVanilla = req.query.has_vanilla === "false"

    if (trueVanilla) {
      allChocolatesData = allChocolatesData.filter(
        chocolate => chocolate.has_vanilla
      )
    } else if (falseVanilla) {
      allChocolatesData = allChocolatesData.filter(
        chocolate => !chocolate.has_vanilla
      )
    } else {
      allChocolatesData = allChocolatesData.filter(
        chocolate => chocolate.has_vanilla === has_vanilla
      )
    }
  }

  if (has_lecithin) {
    const trueLecithin = req.query.has_lecithin === "true"
    const falseLecithin = req.query.has_vanilla === "false"

    if (trueLecithin) {
      allChocolatesData = allChocolatesData.filter(
        chocolate => chocolate.has_lecithin
      )
    } else if (falseLecithin) {
      allChocolatesData = allChocolatesData.filter(
        chocolate => !chocolate.has_lecithin
      )
    } else {
      allChocolatesData = allChocolatesData.filter(
        chocolate => chocolate.has_lecithin === has_lecithin
      )
    }
  }

  if (has_salt) {
    const trueSalt = req.query.has_salt === "true"
    const falseSalt = req.query.has_salt === "false"

    if (trueSalt) {
      allChocolatesData = allChocolatesData.filter(
        chocolate => chocolate.has_salt
      )
    } else if (falseSalt) {
      allChocolatesData = allChocolatesData.filter(
        chocolate => !chocolate.has_salt
      )
    } else {
      allChocolatesData = allChocolatesData.filter(
        chocolate => chocolate.has_salt === has_salt
      )
    }
  }

  if (has_sugar) {
    const trueSugar = req.query.has_sugar === "true"
    const falseSugar = req.query.has_sugar === "false"

    if (trueSugar) {
      allChocolatesData = allChocolatesData.filter(
        chocolate => chocolate.has_sugar
      )
    } else if (falseSugar) {
      allChocolatesData = allChocolatesData.filter(
        chocolate => !chocolate.has_sugar
      )
    } else {
      allChocolatesData = allChocolatesData.filter(
        chocolate => chocolate.has_sugar === has_sugar
      )
    }
  }

  if (has_other_sweetener) {
    const trueOtherSweetener = req.query.has_other_sweetener === "true"
    const falseOtherSweetener = req.query.has_other_sweetener === "false"

    if (trueOtherSweetener) {
      allChocolatesData = allChocolatesData.filter(
        chocolate => chocolate.has_other_sweetener
      )
    } else if (falseOtherSweetener) {
      allChocolatesData = allChocolatesData.filter(
        chocolate => !chocolate.has_other_sweetener
      )
    } else {
      allChocolatesData = allChocolatesData.filter(
        chocolate => chocolate.has_other_sweetener === has_other_sweetener
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
  res.status(200).json({
    success: true,
    status_code: 200,
    message: "Type an ID at the end of the path if you want to find a specific chocolate."
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
  res.status(200).json({
    success: true,
    status_code: 200,
    message: "Type a name at the end of the path if you want to find a specific chocolate."
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
    chocolate => chocolate.count_of_ingredients >= 6
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

app.get("/endpoints", (req, res) => {
  res.send(allEndpoints(app))
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
