import React from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import AvocadoPage from "./AvocadoPage"
import RegionsPage from "./RegionsPage"
import MostExpensiveAvocados from "./MostExpensiveAvocados"
import CheapestAvocados from "./CheapestAvocados"
import HomePage from "./HomePage"
import "./Navbar.css"
import UnderMenu from "./UnderMenu"

function App() {
  return (
    <Router>
      <nav className="Navbar">
        <div className="logo-title">
          <h1>Avocado Haven</h1>
          <img src="/logo.png" alt="Logo" />
        </div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
      <UnderMenu />

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
