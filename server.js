import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

import documentation from './data/documentation.json'
import recipes from './data/recipes.json'

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

const pagination = (data, pageNumber) => {
  const pageSize = 20
  const startIndex = (pageNumber - 1) * pageSize
  const endIndex = startIndex + pageSize
  const itemsOnPage = data.slice(startIndex, endIndex)

  const returnObject = {
    page_size: pageSize,
    page: pageNumber,
    num_of_pages: Math.ceil(data.length / pageSize),
    items_on_page: itemsOnPage.length,
    results: itemsOnPage,
  }
  return returnObject
}

// Start defining your routes here
app.get('/', (req, res) => {
  res.json(documentation)
})

app.get('/endpoints', (req, res) => {
  res.json(listEndpoints(app))
})

// get all recipes with: '/recipes/?page=${page_no}'
// get all recipes from one author (or matching name) with:
// '/recipes/?author={req.query}&page=${page_no}'
app.get('/recipes', (req, res) => {
  const showAuthorRecipes = req.query.author
  // need to add radix parameter "10" when using parseInt
  const page = parseInt(req.query.page, 10)

  let showAllRecipes = recipes

  // this is for searching recipes by the author name
  if (showAuthorRecipes) {
    showAllRecipes = showAllRecipes.filter(
      (recipe) =>
        recipe.Author.toLowerCase().indexOf(showAuthorRecipes.toLowerCase()) !==
        -1
    )
    if (showAllRecipes.length < 1) {
      res.json({
        response: `no recipes found by author ${showAuthorRecipes}`,
        success: false,
      })
    }
  }

  res.json({
    response: pagination(showAllRecipes, page),
    success: true,
  })
})

// get data of one specific recipe
app.get('/recipes/:name', (req, res) => {
  const { name } = req.params
  // remove white space with an underscore; replace(/\s/g, '_')
  const recipeDetails = recipes.find(
    (recipe) =>
      recipe.Name.replace(/\s/g, '_').toLowerCase() ===
      name.replace(/\s/g, '_').toLowerCase()
  )

  if (!recipeDetails) {
    res.status(404).json({
      response: 'recipe not found',
      success: false,
    })
  } else {
    res.status(200).json({
      response: recipeDetails,
      success: true,
    })
  }
})

// list of all unique authors
app.get('/authors', (req, res) => {
  // store all the authors from every recipe in an array call allAuthors
  const allAuthors = recipes.map((recipe) => recipe.Author)
  // remove all duplicate elements from the array, allAuthors
  const uniqueAuthors = [...new Set(allAuthors)]

  res.status(200).json({
    response: uniqueAuthors,
    success: true,
  })
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
