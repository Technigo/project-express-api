res
  .status(404)
  .json(`Sorry, couldn't find any talks matching '${category}'. Try again!`)

app.get("/shows/id/:id", (req, res) => {
  const { id } = req.params
  const titleById = netflixData.find((title) => title.show_id === +id)

  if (!titleById) {
    res.status(400).json({
      response: `There are no titles with id number ${id}`,
    })
  } else {
    res.status(200).json(titleById)
  }
})

if (filteredByCategory.length === 0) {
  res
    .status(404)
    .json(`Sorry, couldn't find any talks matching '${category}'. Try again!`)
} else {
  res.json(filteredByCategory)
}
