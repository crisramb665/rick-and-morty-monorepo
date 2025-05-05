/** npm imports */
import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'

/** local imports */
import './App.css'
import client from './graphql/client'
import Home from './pages/Home'

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </ApolloProvider>
  )
}

export default App
