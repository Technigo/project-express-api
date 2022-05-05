const pagination = (data, pageNumber) => {
    const pageSize = 20
    const startIndex = (pageNumber-1) * pageSize
    const endIndex = startIndex + pageSize
    const itemsOnPage = data.slice(startIndex, endIndex)

    const returnObject = {
        page_size: pageSize,
        page: pageNumber,
        num_of_pages: Math.ceil(data.length / pagesize),
        items_on_page: booksOnPage.length,
        results: itemsOnPage
    }
    return returnObject
}

export default pagination;
