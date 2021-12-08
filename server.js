import express from 'express'
import cors from 'cors'
import recipes from './data/recipes.json'

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
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

// get all recipes with '/recipes'
// get all recipes from one author with '/recipes?author={req.query}'
app.get('/recipes', (req, res) => {
  const showAuthorRecipes = req.query.author

  let showAllRecipes = recipes

  // can use this for searching recipes by the author name
  if (showAuthorRecipes) {
    showAllRecipes = showAllRecipes.filter(
      (recipe) =>
        recipe.Author.toLowerCase().indexOf(showAuthorRecipes.toLowerCase()) !==
        -1
    )
    if (showAllRecipes.length < 1) {
      res.send(`no recipes found by author ${showAuthorRecipes}`)
    }
  }

  res.json({
    response: showAllRecipes,
    success: true,
  })

  // console.log(typeof showAllRecipes) // object
  // console.log(typeof showAuthorRecipes) // string

  // use this if we already know the author names,
  // we can retrieve all the author names with endpoint '/authors'
  // if (showAuthorRecipes === undefined) {
  //   res.json(showAllRecipes)
  // } else {
  //   const authorRecipes = showAllRecipes.filter(
  //     (recipe) => recipe.Author === showAuthorRecipes
  //   )
  //   if (authorRecipes.length < 1) {
  //     res.status(404).send('Author not found')
  //     return
  //   }
  //   res.json(authorRecipes)
  // }
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
    res.status(404).send('recipe not found')
    // res.status(404).json({
    //   response: 'recipe not found',
    //   success: false,
    // })
  } else {
    res.json(recipeDetails)
    // res.status(200).json({
    //   response: recipeDetails,
    //   success: true,
    // })
  }
})

// list of all unique authors
app.get('/authors', (req, res) => {
  // store all the authors from every recipe in a variable call allAuthors
  const allAuthors = recipes.map((recipe) => recipe.Author)
  // remove all duplicate elements from the array, allAuthors
  const uniqueAuthors = [...new Set(allAuthors)]

  // authors = authors.filter(
  //   (author, index, self) => index === self.findIndex((a) => a === author)
  // )

  res.json(uniqueAuthors)
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
