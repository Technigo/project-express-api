//All boardgames sorted by rating: average rating or rank
app.get('/rating/:rating', (req, res) => {
  //param for rating, could be "average" or "rank"
  const rating = req.params.rating

  //query for pages
  let pageSearch = parseInt(req.query.page)

  if (rating === "average") {
    const gamesByRating = boardgamesData.sort((a, b) => -(parseFloat(a.average) - parseFloat(b.average)))
    return gamesByRating
  }
  else if (rating === "rank") {
    const gamesByRating = boardgamesData.sort((a, b) => -(parseFloat(b.rank) - parseFloat(a.rank)))
    return gamesByRating
  }
  //Check how many pages
  const pageCount = Math.ceil(gamesByRating.length / 10)

  //If there's no page-query in the url, the page should be 1
  if (!pageSearch) {
    pageSearch = 1
  }
  //If the query is bigger than the pageCount it should show the last page
  else if (pageSearch > pageCount) {
    pageSearch = pageCount
  }
  res.json(gamesByRating.slice(pageSearch * 10 - 10, pageSearch * 10))
})