import React, { useEffect, useState } from "react"
import axios from "axios"
import "./App.css"
import "./RegionPage.css"
function RegionsPage() {
  const [regions, setRegions] = useState([])

  useEffect(() => {
    axios
      .get("/api/regions")
      .then((response) => {
        setRegions(response.data)
      })
      .catch((error) => {
        console.error("There was an error!", error)
      })
  }, [])

  const generateWikipediaLink = (region) => {
    return `https://en.wikipedia.org/wiki/${region}`
  }

  return (
    <div className="Page">
      <div className="Titlepage">
        <h1>Areas:</h1>
      </div>
      <div className="areas">
        {regions.map((region) => (
          <div className="area" key={region}>
            <h2 style={{ marginBottom: "50px" }}>
              <a
                href={generateWikipediaLink(region)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {region}
              </a>
            </h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RegionsPage
