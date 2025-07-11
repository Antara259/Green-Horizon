import React from 'react'
import BackgroundVideo from '../components/BackgroundVideo'
import NavBlock from '../components/NavBlock'
import AuthButton from '../components/AuthButton'

const Home: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <div className="min-h-screen">
      <BackgroundVideo />
      
      {/* Auth Button */}
      <div className="absolute top-5 right-5 z-10">
        <AuthButton />
      </div>
      
      <div className="max-w-6xl mx-auto px-8 py-8 min-h-screen flex flex-col">
        <header className="text-center mb-12">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-green-800 mb-10 animate-fadeIn relative">
            🌿 Welcome to <span className="text-green-600">Green Horizon</span>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4 w-16 h-1 bg-green-400 rounded-full" />
          </h1>
          <p className="text-green-700 text-xl max-w-2xl mx-auto mb-8 opacity-90">
            Explore sustainable initiatives and eco-friendly solutions for a better tomorrow
          </p>
        </header>
        
        <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 flex-grow">
          <NavBlock
            to="/green-lane"
            title="Green Lane"
            icon="🚴"
            variant="green"
          />
          
          <NavBlock
            to="/local-harvest"
            title="Local Harvest"
            icon="🌽"
            variant="light-green"
          />
          
          <NavBlock
            to="/air-buddy"
            title="Air Buddy"
            icon="🌬️"
            variant="green"
          />
          
          <NavBlock
            to="/wasteless"
            title="WasteLess"
            icon="♻️"
            variant="light-green"
          />
        </nav>
        
        <footer className="text-center text-white p-6 bg-green-950/80 rounded-xl backdrop-blur-sm mt-auto">
          <p className="mb-2">
            &copy; {currentYear} Green Horizon - Sustainable Solutions for a Better World
          </p>
          <div className="flex justify-center gap-4 mt-3">
            <a href="#" className="text-white/80 hover:text-white hover:underline transition-colors">
              About
            </a>
            <a href="#" className="text-white/80 hover:text-white hover:underline transition-colors">
              Contact
            </a>
            <a href="#" className="text-white/80 hover:text-white hover:underline transition-colors">
              Privacy
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Home