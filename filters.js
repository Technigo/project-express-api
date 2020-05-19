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

export const filterMovies = (year, country, cast, movieList) => {

  if (year) {
    return movieList.filter((item) => item.release_year === +year)
  }

  if (country) {
    return movieList.filter((item) => item.country.toLowerCase().includes(country.toLowerCase()))
  }

  if (cast) {
    return movieList.filter((item) => item.cast.includes(cast))
  }

  return movieList;
}
