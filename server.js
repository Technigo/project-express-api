import express from 'express'
import cors from 'cors'

import recipes from './data/recipes.json'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// const pagination = (data, pageNumber) => {
//   const pageSize = 20
//   const startIndex = (pageNumber - 1) * pageSize
//   const endIndex = startIndex + pageSize
//   const itemsOnPage = data.slice(startIndex, endIndex)

//   const returnObject = {
//     page_size: pageSize,
//     page: pageNumber,
//     num_of_pages: Math.ceil(data.length / pagesize),
//     items_on_page: booksOnPage.length,
//     results: itemsOnPage,
//   }
//   return returnObject
// }

// Start defining your routes here
app.get('/recipes', (req, res) => {
  const showAllRecipes = recipes
  const showAuthorRecipes = req.query.author

  // console.log(typeof showAllRecipes) // object
  // console.log(typeof showAuthorRecipes) // string

  // console.log(showAllRecipes.length) // -> 1617
  // console.log(showAuthorRecipes.length) // -> Paul Hollywood: 14 Mary Cadogan: 12

  if (showAuthorRecipes === undefined) {
    res.json(showAllRecipes)
  } else {
    const authorRecipes = showAllRecipes.filter(
      (recipe) => recipe.Author === showAuthorRecipes
    )
    if (authorRecipes.length < 1) {
      res.status(404).send('Author not found')
      return
    }
    res.json(authorRecipes)
  }
})

app.get('/recipes/:name', (req, res) => {
  const { name } = req.params
  // remove white spaces with replace(/\s/g, '')
  const recipeDetails = recipes.find(
    (recipe) => recipe.Name.replace(/\s/g, '_').toLowerCase() === name
  )

  if (!recipeDetails) {
    res.status(404).send('recipe not found')
  } else {
    res.json(recipeDetails)
  }
})

// list of all authors
app.get('/authors', (req, res) => {})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
