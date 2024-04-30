/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from 'react'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [accommodations, setAccommodations] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    setLoading(true)
    fetch('https://project-express-api-7pjc.onrender.com/accommodations')
      .then((res) => res.json())
      .then((data) => {
        setAccommodations(data.data)
        console.log(data)

        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching accommodations:', error)
        setLoading(false) // Set loading to false if there's an error
      })
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()

    const results = accommodations.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    setSearchResults(results)
  }
  return (
    <AppContext.Provider
      value={{
        accommodations,
        loading,
        handleSearch,
        setSearchTerm,
        searchResults,
        searchTerm,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
export const useAppContext = () => {
  const context = useContext(AppContext)
  return context
}
