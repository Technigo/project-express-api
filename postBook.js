export const validateBookInput = (bookDefinition, input) => {
    const result = bookDefinition.map((property) => {
      const test = input[property.fieldName]
      return {
        isValid: typeof test === property.fieldType,
        fieldName: property.fieldName
      }
    })
    return result
  }

  export const addBook = (invalids, fs, validationresult, input, res, error) => {
    if (invalids.length === 0) {
      const result = JSON.parse(fs.readFileSync('./data/books.json'))
      result.push(input)
      const resultJSON = JSON.stringify(result)
      fs.writeFileSync('./data/books.json', resultJSON)
      return validationresult
    } else
      res.status(400).json(error)
  }