import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

interface WeatherData {
  temperature: number
  humidity: number
  windSpeed: number
}

interface AQIData {
  aqi: number
  description: string
  message: string
  icon: string
  background: string
}

const AirBuddy: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [aqiData, setAqiData] = useState<AQIData | null>(null)
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [countdown, setCountdown] = useState(300)
  const [tip, setTip] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const descriptions = ["Good", "Fair", "Moderate", "Poor", "Very Poor"]
  const messages = [
    "Enjoy your day outside!",
    "Air is fine today.",
    "Be cautious, especially for sensitive individuals.",
    "Limit outdoor activities.",
    "Stay indoors and use air purifiers."
  ]

  const backgrounds = {
    1: "linear-gradient(to right, #a8edea, #fed6e3)",
    2: "linear-gradient(to right, #d4fc79, #96e6a1)",
    3: "linear-gradient(to right, #fbc2eb, #a6c1ee)",
    4: "linear-gradient(to right, #fda085, #f6d365)",
    5: "linear-gradient(to right, #f5576c, #f093fb)"
  }

  const ecoTips = [
    "🌱 Add air-purifying indoor plants like spider plant or peace lily.",
    "🚲 Reduce pollution by biking or walking for short trips.",
    "💧 Stay hydrated when the air is dry.",
    "🧼 Keep windows closed on poor AQI days.",
    "🌍 Recycle and reduce waste to help reduce pollution."
  ]

  useEffect(() => {
    // Request notification permission
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission()
    }

    getAQI()
  }, [])

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          getAQI()
          return 300
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const showRandomTip = () => {
    const randomTip = ecoTips[Math.floor(Math.random() * ecoTips.length)]
    setTip(randomTip)
  }

  const getAQI = async () => {
    setLoading(true)
    
    if (!navigator.geolocation) {
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        const apiKey = "85e6a8487f1530f75af6214fff82beb7"
        
        try {
          // Simulate API calls (replace with actual API calls in production)
          const mockAQI = Math.floor(Math.random() * 5) + 1
          const mockTemp = Math.floor(Math.random() * 30) + 10
          const mockHumidity = Math.floor(Math.random() * 50) + 30
          const mockWind = Math.floor(Math.random() * 10) + 1

          setAqiData({
            aqi: mockAQI,
            description: descriptions[mockAQI - 1],
            message: messages[mockAQI - 1],
            icon: `🌤️`, // Simplified icon
            background: backgrounds[mockAQI as keyof typeof backgrounds]
          })

          setWeatherData({
            temperature: mockTemp,
            humidity: mockHumidity,
            windSpeed: mockWind
          })

          setShowAlert(mockAQI >= 4)

          if (mockAQI >= 4 && Notification.permission === "granted") {
            new Notification("AirBuddy Alert", {
              body: `Air quality is ${descriptions[mockAQI - 1]}. ${messages[mockAQI - 1]}`,
              icon: "/AirBuddy/images/eco-notification.png"
            })
          }

          showRandomTip()
        } catch (error) {
          console.error("Error fetching data:", error)
        } finally {
          setLoading(false)
        }
      },
      () => {
        setLoading(false)
      }
    )
  }

  return (
    <div 
      className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'dark' : ''}`}
      style={{ 
        background: aqiData?.background || 'linear-gradient(to right, #89f7fe, #66a6ff)'
      }}
    >
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={toggleDarkMode}
          className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md hover:bg-white/90 transition-colors"
        >
          🌙 Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
      </div>

      <div className="absolute top-4 left-4 z-10">
        <Link
          to="/"
          className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md hover:bg-white/90 transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Home
        </Link>
      </div>

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white/20 backdrop-blur-3xl rounded-3xl p-12 text-center max-w-lg w-full text-white shadow-2xl border border-white/30 animate-fadeIn">
          <h1 className="text-5xl font-bold mb-6 text-shadow-lg font-sans">AirBuddy</h1>
          
          {loading ? (
            <p className="text-2xl font-bold text-gray-800 mb-4">Loading AQI...</p>
          ) : aqiData ? (
            <>
              <p className="text-2xl font-bold text-gray-800 mb-4">
                AQI Level: {aqiData.aqi} ({aqiData.description})
              </p>
              <div className="text-6xl mb-4">{aqiData.icon}</div>
              <p className="text-xl text-gray-800 mb-8">{aqiData.message}</p>
            </>
          ) : null}

          {weatherData && (
            <div className="mb-8 text-gray-800">
              <p className="mb-1">🌡️ Temperature: {weatherData.temperature}°C</p>
              <p className="mb-1">💧 Humidity: {weatherData.humidity}%</p>
              <p className="mb-1">💨 Wind Speed: {weatherData.windSpeed} m/s</p>
            </div>
          )}

          {showAlert && (
            <div className="flex items-center justify-center gap-4 bg-red-500/30 text-red-100 p-4 mb-6 rounded-lg font-semibold animate-pulse">
              <img src="/AirBuddy/images/eco-notification.png" alt="Alert" className="w-6 h-6" />
              <span>Air quality is poor! Stay safe!</span>
            </div>
          )}

          <button
            onClick={getAQI}
            className="bg-white text-blue-600 font-bold px-8 py-4 rounded-lg shadow-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 mb-4"
          >
            Refresh AQI
          </button>

          <div className="text-gray-800 mb-4">Next update in {countdown}s</div>

          {tip && (
            <div className="text-gray-800 italic mt-8 text-lg">{tip}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AirBuddy