import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import GreenLane from './pages/GreenLane'
import LocalHarvest from './pages/LocalHarvest'
import AirBuddy from './pages/AirBuddy'
import WasteLess from './pages/WasteLess'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Account from './pages/Account'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/account" element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        } />
        <Route path="/green-lane" element={
          <ProtectedRoute>
            <GreenLane />
          </ProtectedRoute>
        } />
        <Route path="/local-harvest" element={
          <ProtectedRoute>
            <LocalHarvest />
          </ProtectedRoute>
        } />
        <Route path="/air-buddy" element={
          <ProtectedRoute>
            <AirBuddy />
          </ProtectedRoute>
        } />
        <Route path="/wasteless" element={
          <ProtectedRoute>
            <WasteLess />
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  )
}

export default App