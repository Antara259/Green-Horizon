import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const GreenLane: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [source, setSource] = useState('')
  const [destination, setDestination] = useState('')
  const [mode, setMode] = useState('driving-car')
  const [routeDetails, setRouteDetails] = useState('')
  const [ecoPoints, setEcoPoints] = useState(0)
  const [dailyEmission, setDailyEmission] = useState(0)
  const [weeklyEmission, setWeeklyEmission] = useState(0)
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hide intro after 4 seconds
    const timer = setTimeout(() => {
      setShowIntro(false)
    }, 4000)

    // Load saved eco points
    const savedPoints = localStorage.getItem('ecoPoints')
    if (savedPoints) {
      setEcoPoints(parseInt(savedPoints))
    }

    return () => clearTimeout(timer)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const getEcoRoute = async () => {
    if (!source || !destination) {
      alert('Please enter both places')
      return
    }

    try {
      // Simulate route calculation
      const distance = Math.random() * 100 + 10 // Random distance between 10-110 km
      const time = distance * (Math.random() * 2 + 1) // Random time factor
      const ecoScore = Math.floor(Math.random() * 100)
      
      // Calculate emissions based on mode
      const emissionFactors: Record<string, number> = {
        'driving-car': 0.2,
        'cycling-regular': 0.02,
        'foot-walking': 0.01,
        'motorcycle': 0.1,
        'bus': 0.05
      }
      
      const emission = distance * emissionFactors[mode]
      setDailyEmission(emission)
      setWeeklyEmission(emission * 7)
      
      // Calculate points
      const pointsPerKm: Record<string, number> = {
        'foot-walking': 10,
        'cycling-regular': 8,
        'bus': 5,
        'motorcycle': 2,
        'driving-car': 1
      }
      
      const pointsEarned = Math.floor(distance * pointsPerKm[mode])
      const newPoints = ecoPoints + pointsEarned
      setEcoPoints(newPoints)
      localStorage.setItem('ecoPoints', newPoints.toString())
      
      setRouteDetails(`
        Distance: ${distance.toFixed(1)} km
        Time: ${time.toFixed(1)} mins
        Eco Score: ${ecoScore}/100
        Points Earned: ${pointsEarned}
      `)
      
      alert(`You earned ${pointsEarned} Eco Points! 🌟`)
    } catch (error) {
      alert('Error loading route. Try again.')
    }
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-green-50'}`}>
      {/* Intro Image Overlay */}
      {showIntro && (
        <div className="fixed inset-0 bg-green-200 z-50 flex items-center justify-center transition-opacity duration-1000">
          <img 
            src="/GreenLane/ChatGPT Image Apr 13, 2025, 04_08_21 PM.png" 
            alt="Welcome" 
            className="max-w-[90%] max-h-[90%] rounded-3xl shadow-2xl"
          />
        </div>
      )}

      <header className="bg-gradient-to-r from-green-600 to-green-400 text-white p-4 text-center text-2xl font-bold tracking-wide relative">
        🌱 GREEN LANE
        <button
          onClick={toggleDarkMode}
          className="absolute top-4 right-6 bg-white text-black px-3 py-2 text-base rounded-lg shadow-md hover:bg-gray-100 transition-colors"
        >
          🌓
        </button>
        <Link
          to="/"
          className="absolute top-4 left-6 bg-white text-green-600 px-3 py-2 text-base rounded-lg shadow-md hover:bg-gray-100 transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Home
        </Link>
      </header>

      <div className="flex h-[calc(100vh-70px)]">
        <aside className="w-80 p-5 bg-white/20 backdrop-blur-sm border-r-2 border-gray-300 shadow-lg overflow-y-auto">
          <div className="mb-4">
            <label htmlFor="source" className="block font-semibold mb-1">Source</label>
            <input
              type="text"
              id="source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="e.g. Delhi"
              className="w-full p-2.5 rounded-lg border-none text-base shadow-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="destination" className="block font-semibold mb-1">Destination</label>
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Agra"
              className="w-full p-2.5 rounded-lg border-none text-base shadow-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="mode" className="block font-semibold mb-1">Mode</label>
            <select
              id="mode"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full p-2.5 rounded-lg border-none text-base shadow-md"
            >
              <option value="driving-car">Driving</option>
              <option value="cycling-regular">Cycling</option>
              <option value="foot-walking">Walking</option>
              <option value="motorcycle">Motorbike</option>
              <option value="bus">Public Transport</option>
            </select>
          </div>

          <button
            onClick={getEcoRoute}
            className="w-full p-3 text-lg bg-green-600 text-white border-none rounded-lg cursor-pointer mt-2.5 mb-4 hover:bg-green-700 transition-colors"
          >
            Get Route
          </button>

          {/* Eco Meter */}
          <div className="bg-green-100 p-4 rounded-2xl mt-5 text-center shadow-md">
            <h3 className="mb-2.5 text-lg text-green-800">🌍 Eco Meter</h3>
            <div className="bg-gray-300 rounded-3xl h-5 w-full overflow-hidden mb-2.5">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-1000"
                style={{ width: `${Math.min((dailyEmission / 20) * 100, 100)}%` }}
              />
            </div>
            <p className="text-green-800"><strong>Today's Emission:</strong> {dailyEmission.toFixed(2)} kg CO₂</p>
            <p className="text-green-800"><strong>This Week:</strong> {weeklyEmission.toFixed(2)} kg CO₂</p>
          </div>

          {/* Eco Points */}
          <div className="bg-green-200 p-4 rounded-2xl mt-5 text-center shadow-md">
            <h3 className="mb-2.5 text-lg text-green-800">🏆 Your Eco Points:</h3>
            <p className="text-xl font-bold text-green-600">{ecoPoints}</p>
          </div>

          {/* Route Details */}
          {routeDetails && (
            <div className="mt-4 bg-white p-4 rounded-xl text-sm shadow-md">
              <pre className="whitespace-pre-line text-gray-800">{routeDetails}</pre>
            </div>
          )}
        </aside>

        <div ref={mapRef} className="flex-1 bg-gray-200 flex items-center justify-center">
          <div className="text-gray-600 text-xl">
            🗺️ Interactive Map Area
            <br />
            <span className="text-sm">Routes will be displayed here</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GreenLane