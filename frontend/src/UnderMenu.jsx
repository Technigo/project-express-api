import React from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"

function UnderMenu() {
  return (
    <div className="UnderMenu">
      <Link to="/avocados">Top sells</Link>
      <Link to="/regions">Areas</Link>
      <Link to="/most-expensive">Expensive</Link>
      <Link to="/cheapest">Cheapest</Link>
    </div>
  )
}

export default UnderMenu
