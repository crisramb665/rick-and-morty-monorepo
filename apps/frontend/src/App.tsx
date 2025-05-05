/** npm imports */
import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

/** local imports */
import './App.css'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
