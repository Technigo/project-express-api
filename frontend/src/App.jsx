import React from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import AvocadoPage from "./AvocadoPage"
import RegionsPage from "./RegionsPage"
import MostExpensiveAvocados from "./MostExpensiveAvocados"
import CheapestAvocados from "./CheapestAvocados"
import HomePage from "./HomePage"
import "./Navbar.css"

function App() {
  return (
    <Router>
      <nav className="Navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/avocados">Top sells</Link>
          </li>
          <li>
            <Link to="/regions">Areas</Link>
          </li>
          <li>
            <Link to="/most-expensive">Expensive</Link>
          </li>
          <li>
            <Link to="/cheapest">Cheapest</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/avocados" element={<AvocadoPage />} />
        <Route path="/regions" element={<RegionsPage />} />
        <Route path="/most-expensive" element={<MostExpensiveAvocados />} />
        <Route path="/cheapest" element={<CheapestAvocados />} />
      </Routes>
    </Router>
  )
}

export default App
