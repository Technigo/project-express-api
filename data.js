app.get('/streams/newest', (req, res) => {
    const newToOld = streams.sort(
      (a, b) => b.release_year - a.release_year
    )

    res.status(200).json({
      data: newToOld.slice(0, 2022),
      success: true })
  })

  app.get('/top-rated', (req, res) => {
    const bookRating = books.sort(
      (a, b) => b.average_rating - a.average_rating
    )
    res.json(bookRating.slice(0, 10))
  })