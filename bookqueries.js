export const pagination = (data, pageQuery) => {
    const pagesize = 20
    const startindex = pageQuery * pagesize
    const endindex = startindex + pagesize
    const booksPerPage = data.slice(startindex, endindex)

    const returnObject = {
        page_size: pagesize,
        page: pageQuery,
        max_pages: parseInt(data.length / pagesize),
        num_books: booksPerPage.length,
        results: booksPerPage
    }
    return returnObject
}

export const filterOnLanguage = (data, langQuery, error, res) => {
    const booksInChosenLang = data.filter((item) => item.language_code === langQuery)
    if (booksInChosenLang.length === 0) {
        res.status(404).json(error)
      } return booksInChosenLang
}

export const filterOtherLanguages = (data, langQuery, error, res) => {
    const booksInOtherLang = data.filter((item) => item.language_code != langQuery)
    if (booksInOtherLang.length === 0) {
        res.status(404).json(error)
      } return booksInOtherLang
}

export const sortByNumPages = (data, sortedQuery) => {
    if (sortedQuery === "dsc") {
        data.sort((a, b) => b.num_pages - a.num_pages);
      } else if (sortedQuery === "asc") {
        data.sort((a, b) => a.num_pages - b.num_pages);
      }
      return data;
}