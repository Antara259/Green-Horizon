import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const LocalHarvest: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [source, setSource] = useState('')
  const [destination, setDestination] = useState('')
  const [mode, setMode] = useState('driving-car')
  const [routeDetails, setRouteDetails] = useState('')
  const [filters, setFilters] = useState({
    'eco-certified': true,
    'farm-sourced': true,
    'organic': true,
    'farmers-market': true,
    'sustainable-grocer': true
  })
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hide intro after 4 seconds
    const timer = setTimeout(() => {
      setShowIntro(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleFilterChange = (filterKey: string) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: !prev[filterKey as keyof typeof prev]
    }))
  }

  const getEcoRoute = async () => {
    if (!source || !destination) {
      alert('Please enter both places')
      return
    }

    try {
      // Simulate route calculation with local harvest spots
      const distance = Math.random() * 100 + 10
      const time = distance * (Math.random() * 2 + 1)
      const ecoScore = Math.floor(Math.random() * 100)
      
      // Simulate finding local harvest spots
      const activeFilters = Object.entries(filters)
        .filter(([_, active]) => active)
        .map(([key, _]) => key)
      
      const spotCount = Math.floor(Math.random() * 5) + 1
      
      setRouteDetails(`
        Distance: ${distance.toFixed(1)} km
        Time: ${time.toFixed(1)} mins
        Eco Score: ${ecoScore}/100
        Local Food Spots Found: ${spotCount}
        Active Filters: ${activeFilters.join(', ')}
      `)
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
            src="/LocalHarvest/Local_Harvest.png" 
            alt="Welcome" 
            className="max-w-[90%] max-h-[90%] rounded-3xl shadow-2xl"
          />
        </div>
      )}

      <header className="bg-gradient-to-r from-green-600 to-green-400 text-white p-4 text-center text-2xl font-bold tracking-wide relative">
        🌱 LOCAL HARVEST
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

          {/* Filter Panel */}
          <div className="bg-white/80 p-4 rounded-xl shadow-md mb-4">
            <h3 className="text-lg font-semibold mb-3 text-green-800">Local Harvest Sustainable Food Finder</h3>
            {Object.entries(filters).map(([key, checked]) => (
              <label key={key} className="flex items-center mb-2 text-green-700">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleFilterChange(key)}
                  className="mr-2"
                />
                {key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </label>
            ))}
          </div>

          {/* Route Details */}
          {routeDetails && (
            <div className="mt-4 bg-white p-4 rounded-xl text-sm shadow-md">
              <pre className="whitespace-pre-line text-gray-800">{routeDetails}</pre>
            </div>
          )}
        </aside>

        <div ref={mapRef} className="flex-1 bg-gray-200 flex items-center justify-center">
          <div className="text-gray-600 text-xl text-center">
            🗺️ Interactive Map Area
            <br />
            <span className="text-sm">Local harvest spots and routes will be displayed here</span>
            <br />
            <span className="text-xs mt-2 block">🌽 Farm locations • 🏪 Markets • 🥬 Organic stores</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocalHarvest