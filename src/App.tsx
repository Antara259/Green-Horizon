import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import GreenLane from './pages/GreenLane'
import LocalHarvest from './pages/LocalHarvest'
import AirBuddy from './pages/AirBuddy'
import WasteLess from './pages/WasteLess'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/green-lane" element={<GreenLane />} />
      <Route path="/local-harvest" element={<LocalHarvest />} />
      <Route path="/air-buddy" element={<AirBuddy />} />
      <Route path="/wasteless" element={<WasteLess />} />
    </Routes>
  )
}

export default App