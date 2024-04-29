import React, { useEffect, useState } from "react"
import axios from "axios"
import "./App.css"

function MostExpensiveAvocados() {
  const [avocados, setAvocados] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:3000/sales/mostExpensive")
      .then((response) => {
        setAvocados(response.data)
      })
      .catch((error) => {
        console.error("There was an error!", error)
      })
  }, [])

  return (
    <div className="Page">
      <h1>Most expensive avocados:</h1>
      {avocados.map((avocado) => (
        <div key={avocado.id}>
          <h2>{avocado.region}</h2>
          <p className="p-style">
            Average price per bag: {avocado.averagePrice}
          </p>
        </div>
      ))}
    </div>
  )
}

export default MostExpensiveAvocados
