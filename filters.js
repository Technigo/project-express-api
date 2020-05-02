export const mappedNetflix = (arr) => {
    
  return arr.map((item) => {
    return {
      "title": item.title,
      "year": item.release_year,
      "cast": item.cast,
      "category": item.type,
      "country": item.country,
      "id": item.show_id
    }
    })
}

export const filterMoviesOnYear = (year, movies) => {
  if (year) {
    return movies.filter((item) => item.release_year === +year)
  }

  return movies;
}

export const filterMoviesByCountry = (country, movieList) => {
  if (country) {
    return movieList.filter((item) => item.country.toLowerCase().includes(country.toLowerCase()))
  }

  return movieList
}

export const filterMoviesByActor = (actor, movieList) => {
  if (actor) {
    return movieList.filter((item) => item.cast.includes(actor))
  }
  return movieList
}